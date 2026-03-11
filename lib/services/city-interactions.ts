/**
 * 도시 상호작용 API 서비스 (클라이언트 전용)
 * 좋아요/싫어요 시스템 관리
 */

'use client';

import { createClient } from '@/lib/supabase/client';
import type {
  CityInteraction,
  CityStats,
  ToggleInteractionResponse
} from '@/types/database';

// 클라이언트 사이드 함수들

/**
 * 좋아요/싫어요 토글 (클라이언트)
 * 이미 같은 타입의 상호작용이 있으면 삭제, 다른 타입이면 업데이트, 없으면 생성
 */
export async function toggleCityInteraction(
  cityId: number,
  type: 'like' | 'dislike'
): Promise<ToggleInteractionResponse> {
  const supabase = createClient();

  // 현재 사용자 확인
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      interaction: null,
      stats: { city_id: cityId, likes: 0, dislikes: 0, total_interactions: 0 }
    };
  }

  try {
    // 기존 상호작용 조회
    const { data: existingInteraction } = await supabase
      .from('city_interactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('city_id', cityId)
      .single();

    let newInteraction: CityInteraction | null = null;

    if (existingInteraction) {
      if (existingInteraction.interaction_type === type) {
        // 같은 타입이면 삭제 (토글 off)
        const { error: deleteError } = await supabase
          .from('city_interactions')
          .delete()
          .eq('id', existingInteraction.id);

        if (deleteError) throw deleteError;

      } else {
        // 다른 타입이면 업데이트
        const { data: updatedData, error: updateError } = await supabase
          .from('city_interactions')
          .update({ interaction_type: type })
          .eq('id', existingInteraction.id)
          .select()
          .single();

        if (updateError) throw updateError;
        newInteraction = updatedData;
      }
    } else {
      // 상호작용이 없으면 새로 생성
      const { data: insertedData, error: insertError } = await supabase
        .from('city_interactions')
        .insert({
          user_id: user.id,
          city_id: cityId,
          interaction_type: type
        })
        .select()
        .single();

      if (insertError) throw insertError;
      newInteraction = insertedData;
    }

    // 최신 통계 조회
    const { data: statsData } = await supabase
      .from('city_stats')
      .select('*')
      .eq('city_id', cityId)
      .single();

    const stats: CityStats = statsData || {
      city_id: cityId,
      likes: 0,
      dislikes: 0,
      total_interactions: 0
    };

    return {
      success: true,
      interaction: newInteraction,
      stats
    };

  } catch (error) {
    console.error('Error toggling city interaction:', error);
    return {
      success: false,
      interaction: null,
      stats: { city_id: cityId, likes: 0, dislikes: 0, total_interactions: 0 }
    };
  }
}

/**
 * 도시 통계 조회 (클라이언트)
 */
export async function getCityStatsClient(cityId: number): Promise<CityStats> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('city_stats')
    .select('*')
    .eq('city_id', cityId)
    .single();

  if (error) {
    // 상호작용이 없는 경우 기본값 반환
    return {
      city_id: cityId,
      likes: 0,
      dislikes: 0,
      total_interactions: 0
    };
  }

  return data;
}

/**
 * 사용자의 특정 도시 상호작용 조회 (클라이언트)
 */
export async function getUserInteractionForCityClient(
  cityId: number
): Promise<CityInteraction | null> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('city_interactions')
    .select('*')
    .eq('user_id', user.id)
    .eq('city_id', cityId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user interaction:', error);
  }

  return data || null;
}

/**
 * 여러 도시에 대한 사용자 상호작용을 한번에 조회 (클라이언트)
 */
export async function getUserInteractionsForCities(
  cityIds: number[]
): Promise<Record<number, CityInteraction>> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('city_interactions')
    .select('*')
    .eq('user_id', user.id)
    .in('city_id', cityIds);

  if (error) {
    console.error('Error fetching user interactions for cities:', error);
    return {};
  }

  // cityId를 키로 하는 객체로 변환
  return (data || []).reduce((acc, interaction) => {
    acc[interaction.city_id] = interaction;
    return acc;
  }, {} as Record<number, CityInteraction>);
}