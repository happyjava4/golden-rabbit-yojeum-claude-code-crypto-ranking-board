"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { City } from "@/types/city";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRealtimeCityStats, useToggleCityInteraction } from "@/lib/hooks/useRealtimeCityStats";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 실시간 도시 통계와 사용자 상호작용
  const {
    stats,
    userInteraction,
    isLoading: isStatsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useRealtimeCityStats(city.id);

  const [optimisticStats, setOptimisticStats] = useState(stats);
  const [optimisticInteractionType, setOptimisticInteractionType] = useState<
    'like' | 'dislike' | null
  >(userInteraction?.interaction_type ?? null);

  // 좋아요/싫어요 토글 액션
  const { toggle, isToggling, error: toggleError } = useToggleCityInteraction();

  const supabase = useMemo(() => createClient(), []);

  // 인증 상태 확인
  useEffect(() => {
    if (!supabase) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setIsCheckingAuth(false);
    };

    checkAuth();

    // 인증 상태 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setOptimisticStats(stats);
  }, [stats.city_id, stats.likes, stats.dislikes, stats.total_interactions]);

  useEffect(() => {
    setOptimisticInteractionType(userInteraction?.interaction_type ?? null);
  }, [userInteraction?.interaction_type]);

  const applyOptimisticUpdate = (
    nextType: 'like' | 'dislike' | null,
    prevType: 'like' | 'dislike' | null
  ) => {
    setOptimisticStats((prev) => {
      let likes = prev.likes;
      let dislikes = prev.dislikes;
      let total = prev.total_interactions;

      if (prevType === nextType) {
        return prev;
      }

      if (nextType === 'like') {
        likes = prevType === 'like' ? Math.max(0, likes - 1) : likes + 1;
        total = prevType === 'like' ? Math.max(0, total - 1) : total + 1;
      }

      if (nextType === 'dislike') {
        dislikes = prevType === 'dislike' ? Math.max(0, dislikes - 1) : dislikes + 1;
        total = prevType === 'dislike' ? Math.max(0, total - 1) : total + 1;
      }

      if (nextType === null && prevType === 'like') {
        likes = Math.max(0, likes - 1);
        total = Math.max(0, total - 1);
      }

      if (nextType === null && prevType === 'dislike') {
        dislikes = Math.max(0, dislikes - 1);
        total = Math.max(0, total - 1);
      }

      return {
        ...prev,
        likes,
        dislikes,
        total_interactions: total,
      };
    });
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      // 로그인 페이지로 리디렉션
      window.location.href = '/login';
      return;
    }

    if (isToggling) {
      console.log('[handleLikeClick] Already toggling, skipping');
      return;
    }

    const previousType = optimisticInteractionType;
    const nextType = previousType === 'like' ? null : 'like';
    setOptimisticInteractionType(nextType);
    applyOptimisticUpdate(nextType, previousType);

    console.log('[handleLikeClick] Toggling like for city', city.id);
    const success = await toggle(city.id, 'like');
    if (success) {
      await refetchStats();
    } else {
      setOptimisticInteractionType(previousType);
      applyOptimisticUpdate(previousType, nextType);
    }
  };

  // 싫어요 버튼 클릭 핸들러
  const handleDislikeClick = async () => {
    if (!isAuthenticated) {
      // 로그인 페이지로 리디렉션
      window.location.href = '/login';
      return;
    }

    if (isToggling) {
      console.log('[handleDislikeClick] Already toggling, skipping');
      return;
    }

    const previousType = optimisticInteractionType;
    const nextType = previousType === 'dislike' ? null : 'dislike';
    setOptimisticInteractionType(nextType);
    applyOptimisticUpdate(nextType, previousType);

    console.log('[handleDislikeClick] Toggling dislike for city', city.id);
    const success = await toggle(city.id, 'dislike');
    if (success) {
      await refetchStats();
    } else {
      setOptimisticInteractionType(previousType);
      applyOptimisticUpdate(previousType, nextType);
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--green))] hover:shadow-lg hover:shadow-[rgb(var(--green))]/20">
      <div className="p-4">
        {/* 상단 타이틀 바 (터미널 스타일) */}
        <div className="mb-3 flex items-center gap-2 border-b border-[rgb(var(--border))] pb-2">
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--red))]" />
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--amber))]" />
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--green))]" />
          </div>
          <span className="text-xs text-[rgb(var(--dim))]">
            city_{String(city.id).padStart(3, "0")}_{city.name}.dat
          </span>
        </div>

        {/* ASCII 아트 + 도시 정보 */}
        <div className="mb-4 flex gap-4">
          {/* ASCII 아트 */}
          <pre className="flex-shrink-0 text-[rgb(var(--green))] text-xs leading-tight">
            {city.art}
          </pre>

          {/* 도시 정보 */}
          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold text-[rgb(var(--green))]">
              {city.name}
            </h3>
            <div className="mb-2 flex flex-wrap gap-1">
              {city.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`rounded px-2 py-0.5 text-xs font-bold ${
                    idx === 0
                      ? "bg-[rgb(var(--green))]/20 text-[rgb(var(--green))]"
                      : "bg-[rgb(var(--cyan))]/20 text-[rgb(var(--cyan))]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 필터 정보 (Key-Value) */}
        <div className="mb-4 space-y-2 font-mono text-sm">
          <div className="flex gap-2">
            <span className="text-[rgb(var(--dim))]">예산:</span>
            <span className="text-[rgb(var(--text-primary))]">{city.budget}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[rgb(var(--dim))]">지역:</span>
            <span className="text-[rgb(var(--text-primary))]">{city.region}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[rgb(var(--dim))]">환경:</span>
            <span className="text-[rgb(var(--text-primary))]">{city.environment.join(', ')}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[rgb(var(--dim))]">최고 계절:</span>
            <span className="text-[rgb(var(--text-primary))]">{city.bestSeason}</span>
          </div>
        </div>

        {/* 에러 메시지 */}
        {(statsError || toggleError) && (
          <div className="mb-4 rounded bg-[rgb(var(--red))]/20 p-2 text-sm text-[rgb(var(--red))]">
            {statsError || toggleError}
          </div>
        )}

        {/* 좋아요/싫어요 버튼 */}
        <div className="flex items-center justify-between border-t border-[rgb(var(--border))] pt-3">
          <button
            onClick={handleLikeClick}
            disabled={isToggling || isCheckingAuth}
            className={`flex items-center gap-2 rounded px-3 py-2 font-mono text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              optimisticInteractionType === 'like'
                ? 'bg-[rgb(var(--green))] text-black'
                : 'bg-[rgb(var(--bg))] text-[rgb(var(--dim))] hover:text-[rgb(var(--green))]'
            }`}
            title={!isAuthenticated ? '로그인이 필요합니다' : ''}
          >
            {isToggling && optimisticInteractionType !== 'like' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-lg">👍</span>
            )}
            <span>
              {isStatsLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                optimisticStats.likes
              )}
            </span>
          </button>

          <button
            onClick={handleDislikeClick}
            disabled={isToggling || isCheckingAuth}
            className={`flex items-center gap-2 rounded px-3 py-2 font-mono text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              optimisticInteractionType === 'dislike'
                ? 'bg-[rgb(var(--red))] text-white'
                : 'bg-[rgb(var(--bg))] text-[rgb(var(--dim))] hover:text-[rgb(var(--red))]'
            }`}
            title={!isAuthenticated ? '로그인이 필요합니다' : ''}
          >
            {isToggling && optimisticInteractionType !== 'dislike' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-lg">👎</span>
            )}
            <span>
              {isStatsLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                optimisticStats.dislikes
              )}
            </span>
          </button>
        </div>
        
        <div className="mt-3">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full border-[rgb(var(--border))] text-[rgb(var(--text))] hover:border-[rgb(var(--green))] hover:text-[rgb(var(--green))]"
          >
            <Link href={`/cities/${city.id}`}>상세 보기</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
