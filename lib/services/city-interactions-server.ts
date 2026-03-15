/**
 * 도시 상호작용 서버 API 서비스
 * Server Components, Server Actions, Route Handlers 전용
 */

import type {
  CityInteraction,
  CityStats,
} from '@/types/database';

/**
 * 도시별 좋아요/싫어요 통계 조회 (서버)
 */
export async function getCityStats(cityId: number): Promise<CityStats | null> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('city_stats')
    .select('*')
    .eq('city_id', cityId)
    .single();

  if (error) {
    console.error('Error fetching city stats:', error);
    if (error.code === 'PGRST116') {
      return {
        city_id: cityId,
        likes: 0,
        dislikes: 0,
        total_interactions: 0
      };
    }
    return null;
  }

  return data;
}

/**
 * 모든 도시의 통계를 한번에 조회 (서버)
 */
export async function getAllCityStats(): Promise<Record<number, CityStats>> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('city_stats')
    .select('*');

  if (error) {
    console.error('Error fetching all city stats:', error);
    return {};
  }

  return data.reduce((acc: Record<number, CityStats>, stat: CityStats) => {
    acc[stat.city_id] = stat;
    return acc;
  }, {} as Record<number, CityStats>);
}

/**
 * 사용자의 모든 도시 상호작용 조회 (서버)
 */
export async function getUserInteractions(userId: string): Promise<CityInteraction[]> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('city_interactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user interactions:', error);
    return [];
  }

  return data || [];
}

/**
 * 특정 도시에 대한 사용자 상호작용 조회 (서버)
 */
export async function getUserInteractionForCity(
  userId: string,
  cityId: number
): Promise<CityInteraction | null> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('city_interactions')
    .select('*')
    .eq('user_id', userId)
    .eq('city_id', cityId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching user interaction for city:', error);
    return null;
  }

  return data;
}
