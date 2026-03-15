/**
 * 도시 상호작용 클라이언트 API 서비스
 * Client Components 전용
 */

'use client';

import { createClient } from '@/lib/supabase/client';
import type {
  CityInteraction,
  CityStats,
  ToggleInteractionResponse,
} from '@/types/database';

/**
 * 좋아요/싫어요 토글 (클라이언트)
 * 이미 같은 타입의 상호작용이 있으면 삭제, 다른 타입이면 업데이트, 없으면 생성
 */
export async function toggleCityInteraction(
  cityId: number,
  type: 'like' | 'dislike'
): Promise<ToggleInteractionResponse> {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      interaction: null,
      stats: { city_id: cityId, likes: 0, dislikes: 0, total_interactions: 0 }
    };
  }

  try {
    console.log('[toggleCityInteraction] Starting - cityId:', cityId, 'type:', type, 'userId:', user.id);

    const { data: existingInteraction, error: queryError } = await supabase
      .from('city_interactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('city_id', cityId)
      .single();

    console.log('[toggleCityInteraction] Existing interaction query result:', { existingInteraction, queryError });

    let newInteraction: CityInteraction | null = null;

    if (existingInteraction) {
      console.log('[toggleCityInteraction] Found existing interaction:', existingInteraction);

      if (existingInteraction.interaction_type === type) {
        console.log('[toggleCityInteraction] Same type - deleting interaction');
        const { error: deleteError } = await supabase
          .from('city_interactions')
          .delete()
          .eq('id', existingInteraction.id);

        if (deleteError) {
          console.error('[toggleCityInteraction] Delete error:', deleteError);
          throw deleteError;
        }
        console.log('[toggleCityInteraction] Successfully deleted');

      } else {
        console.log('[toggleCityInteraction] Different type - updating interaction');
        const { data: updatedData, error: updateError } = await supabase
          .from('city_interactions')
          .update({ interaction_type: type })
          .eq('id', existingInteraction.id)
          .select()
          .single();

        if (updateError) {
          console.error('[toggleCityInteraction] Update error:', updateError);
          throw updateError;
        }
        console.log('[toggleCityInteraction] Successfully updated:', updatedData);
        newInteraction = updatedData;
      }
    } else {
      console.log('[toggleCityInteraction] No existing interaction - inserting new');
      const { data: insertedData, error: insertError } = await supabase
        .from('city_interactions')
        .insert({
          user_id: user.id,
          city_id: cityId,
          interaction_type: type
        })
        .select()
        .single();

      if (insertError) {
        console.error('[toggleCityInteraction] Insert error:', insertError);
        throw insertError;
      }
      console.log('[toggleCityInteraction] Successfully inserted:', insertedData);
      newInteraction = insertedData;
    }

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

  // Debug 로그는 필요 시에만 사용
  // console.debug('[getCityStatsClient] Fetching stats for cityId:', cityId);

  const { data, error } = await supabase
    .from('city_stats')
    .select('*')
    .eq('city_id', cityId)
    .single();

  // console.debug('[getCityStatsClient] Query result:', { data, error });

  if (error) {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('[getCityStatsClient] Error, returning zeros:', error);
    }
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
  // console.debug('[getUserInteractionForCityClient] cityId:', cityId, 'user:', user?.id);

  if (!user) {
    // console.debug('[getUserInteractionForCityClient] No user, returning null');
    return null;
  }

  const { data, error } = await supabase
    .from('city_interactions')
    .select('*')
    .eq('user_id', user.id)
    .eq('city_id', cityId)
    .maybeSingle();

  // console.debug('[getUserInteractionForCityClient] Query result:', { data, error });

  // PGRST116은 데이터 없음을 의미하므로 정상
  if (error && error.code !== 'PGRST116') {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('[getUserInteractionForCityClient] Error fetching user interaction:', error);
    }
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

  return (data || []).reduce((acc, interaction) => {
    acc[interaction.city_id] = interaction;
    return acc;
  }, {} as Record<number, CityInteraction>);
}
