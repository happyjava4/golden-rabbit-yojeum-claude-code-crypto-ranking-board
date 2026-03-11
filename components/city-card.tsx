"use client";

import { useState } from "react";
import Link from "next/link";
import { City } from "@/types/city";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  // 좋아요/싫어요 상태 관리
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [currentLikes, setCurrentLikes] = useState(city.likes);
  const [currentDislikes, setCurrentDislikes] = useState(city.dislikes);

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (userVote === 'like') {
      // 이미 좋아요 → 투표 취소
      setUserVote(null);
      setCurrentLikes(prev => prev - 1);
    } else if (userVote === 'dislike') {
      // 싫어요 → 좋아요로 변경
      setUserVote('like');
      setCurrentLikes(prev => prev + 1);
      setCurrentDislikes(prev => prev - 1);
    } else {
      // 미투표 → 좋아요
      setUserVote('like');
      setCurrentLikes(prev => prev + 1);
    }
  };

  // 싫어요 버튼 클릭 핸들러
  const handleDislikeClick = () => {
    if (userVote === 'dislike') {
      // 이미 싫어요 → 투표 취소
      setUserVote(null);
      setCurrentDislikes(prev => prev - 1);
    } else if (userVote === 'like') {
      // 좋아요 → 싫어요로 변경
      setUserVote('dislike');
      setCurrentDislikes(prev => prev + 1);
      setCurrentLikes(prev => prev - 1);
    } else {
      // 미투표 → 싫어요
      setUserVote('dislike');
      setCurrentDislikes(prev => prev + 1);
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

        {/* 좋아요/싫어요 버튼 */}
        <div className="border-t border-[rgb(var(--border))] pt-3">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-2 rounded px-3 py-2 font-mono text-sm transition-all duration-200 hover:scale-105 ${
                userVote === 'like'
                  ? 'bg-[rgb(var(--green))] text-black'
                  : 'bg-[rgb(var(--bg))] text-[rgb(var(--dim))] hover:text-[rgb(var(--green))]'
              }`}
            >
              <span className="text-lg">👍</span>
              <span>{currentLikes}</span>
            </button>

            <button
              onClick={handleDislikeClick}
              className={`flex items-center gap-2 rounded px-3 py-2 font-mono text-sm transition-all duration-200 hover:scale-105 ${
                userVote === 'dislike'
                  ? 'bg-[rgb(var(--red))] text-white'
                  : 'bg-[rgb(var(--bg))] text-[rgb(var(--dim))] hover:text-[rgb(var(--red))]'
              }`}
            >
              <span>{currentDislikes}</span>
              <span className="text-lg">👎</span>
            </button>
          </div>

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
