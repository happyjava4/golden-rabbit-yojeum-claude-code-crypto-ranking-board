/**
 * 실시간 도시 통계 Hook
 * Supabase Realtime을 사용한 좋아요/싫어요 실시간 업데이트
 */

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getCityStatsClient, getUserInteractionForCityClient } from '@/lib/services/city-interactions';
import type { CityStats, CityInteraction } from '@/types/database';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeCityStatsReturn {
  stats: CityStats;
  userInteraction: CityInteraction | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * 특정 도시의 실시간 통계와 사용자 상호작용을 관리하는 Hook
 */
export function useRealtimeCityStats(cityId: number): UseRealtimeCityStatsReturn {
  const [stats, setStats] = useState<CityStats>({
    city_id: cityId,
    likes: 0,
    dislikes: 0,
    total_interactions: 0
  });
  const [userInteraction, setUserInteraction] = useState<CityInteraction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // 데이터 페칭 함수
  const fetchData = async () => {
    try {
      setError(null);
      const [statsData, interactionData] = await Promise.all([
        getCityStatsClient(cityId),
        getUserInteractionForCityClient(cityId)
      ]);

      setStats(statsData);
      setUserInteraction(interactionData);
    } catch (err) {
      console.error('Error fetching city data:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 통계 재계산 (실시간 업데이트 시 사용)
  const recalculateStats = async () => {
    try {
      const updatedStats = await getCityStatsClient(cityId);
      setStats(updatedStats);
    } catch (err) {
      console.error('Error recalculating stats:', err);
    }
  };

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      setError('Supabase 설정이 없어 데이터를 불러올 수 없습니다.');
      return;
    }

    // 초기 데이터 로드
    fetchData();

    // Realtime 구독 설정
    channelRef.current = supabase
      .channel(`city_interactions_${cityId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE 모든 이벤트
          schema: 'public',
          table: 'city_interactions',
          filter: `city_id=eq.${cityId}`
        },
        async (payload) => {
          console.log('City interaction change detected:', payload);

          // 통계 재계산
          await recalculateStats();

          // 현재 사용자의 상호작용이 변경되었는지 확인
          const { data: { user } } = await supabase.auth.getUser();
          if (user && payload.new && (payload.new as any).user_id === user.id) {
            // 현재 사용자의 상호작용 업데이트
            if (payload.eventType === 'DELETE') {
              setUserInteraction(null);
            } else {
              setUserInteraction(payload.new as CityInteraction);
            }
          }
        }
      )
      .subscribe();

    // cleanup
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [cityId, supabase]);

  return {
    stats,
    userInteraction,
    isLoading,
    error,
    refetch: fetchData
  };
}

/**
 * 여러 도시의 통계를 한번에 관리하는 Hook
 */
interface UseRealtimeAllCityStatsReturn {
  allStats: Record<number, CityStats>;
  userInteractions: Record<number, CityInteraction>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRealtimeAllCityStats(cityIds: number[]): UseRealtimeAllCityStatsReturn {
  const [allStats, setAllStats] = useState<Record<number, CityStats>>({});
  const [userInteractions, setUserInteractions] = useState<Record<number, CityInteraction>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const fetchAllData = async () => {
    const activeSupabase = supabase;

    if (!activeSupabase) {
      setIsLoading(false);
      setError('Supabase 설정이 없어 데이터를 불러올 수 없습니다.');
      return;
    }

    try {
      setError(null);

      // 모든 도시 통계 조회
      const statsPromises = cityIds.map(async (cityId) => {
        const stats = await getCityStatsClient(cityId);
        return { cityId, stats };
      });

      const statsResults = await Promise.all(statsPromises);
      const newAllStats = statsResults.reduce((acc, { cityId, stats }) => {
        acc[cityId] = stats;
        return acc;
      }, {} as Record<number, CityStats>);

      // 사용자 상호작용 조회
  const { data: { user } } = await activeSupabase.auth.getUser();
      let newUserInteractions: Record<number, CityInteraction> = {};

      if (user) {
        const { data: interactions } = await activeSupabase
          .from('city_interactions')
          .select('*')
          .eq('user_id', user.id)
          .in('city_id', cityIds);

        newUserInteractions = (interactions || []).reduce((acc, interaction) => {
          acc[interaction.city_id] = interaction;
          return acc;
        }, {} as Record<number, CityInteraction>);
      }

      setAllStats(newAllStats);
      setUserInteractions(newUserInteractions);
    } catch (err) {
      console.error('Error fetching all city data:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityIds.length === 0) {
      setIsLoading(false);
      return;
    }

    if (!supabase) {
      setIsLoading(false);
      setError('Supabase 설정이 없어 데이터를 불러올 수 없습니다.');
      return;
    }

  const activeSupabase = supabase;

  // 초기 데이터 로드
  fetchAllData();

    // 모든 도시에 대한 Realtime 구독
    channelRef.current = activeSupabase
      .channel('all_city_interactions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'city_interactions'
        },
        async (payload) => {
          const changedCityId = (payload.new as any)?.city_id || (payload.old as any)?.city_id;

          if (cityIds.includes(changedCityId)) {
            console.log('City interaction change detected for city:', changedCityId);

            // 해당 도시의 통계만 업데이트
            try {
              const updatedStats = await getCityStatsClient(changedCityId);
              setAllStats(prev => ({
                ...prev,
                [changedCityId]: updatedStats
              }));

              // 현재 사용자의 상호작용이 변경되었는지 확인
              const { data: { user } } = await activeSupabase.auth.getUser();
              if (user && payload.new && (payload.new as any).user_id === user.id) {
                if (payload.eventType === 'DELETE') {
                  setUserInteractions(prev => {
                    const updated = { ...prev };
                    delete updated[changedCityId];
                    return updated;
                  });
                } else {
                  setUserInteractions(prev => ({
                    ...prev,
                    [changedCityId]: payload.new as CityInteraction
                  }));
                }
              }
            } catch (err) {
              console.error('Error updating city stats:', err);
            }
          }
        }
      )
      .subscribe();

    // cleanup
    return () => {
      if (channelRef.current) {
  activeSupabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [cityIds, supabase]);

  return {
    allStats,
    userInteractions,
    isLoading,
    error,
    refetch: fetchAllData
  };
}

/**
 * 사용자의 좋아요/싫어요 토글 액션을 관리하는 Hook
 */
interface UseToggleCityInteractionReturn {
  toggle: (cityId: number, type: 'like' | 'dislike') => Promise<boolean>;
  isToggling: boolean;
  error: string | null;
}

export function useToggleCityInteraction(): UseToggleCityInteractionReturn {
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (cityId: number, type: 'like' | 'dislike'): Promise<boolean> => {
    setIsToggling(true);
    setError(null);

    try {
      // 실제 토글은 city-interactions 서비스에서 처리
      const { toggleCityInteraction } = await import('@/lib/services/city-interactions');
      const result = await toggleCityInteraction(cityId, type);

      if (!result.success) {
        throw new Error('상호작용 업데이트에 실패했습니다.');
      }

      return true;
    } catch (err) {
      console.error('Error toggling city interaction:', err);
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      return false;
    } finally {
      setIsToggling(false);
    }
  };

  return {
    toggle,
    isToggling,
    error
  };
}