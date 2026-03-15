/**
 * 사용자 프로필 API 서비스
 * 프로필 관리 및 맞춤 추천 시스템
 */

import { createClient as createClientClient } from '@/lib/supabase/client';
import { cities } from '@/lib/data/cities';
import type { Profile, ProfileUpdateRequest } from '@/types/database';
import type { City } from '@/types/city';

// 서버 사이드 함수들

async function getServerClient() {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    return await createClient();
  } catch (error) {
    console.warn('Supabase server client unavailable:', error);
    return null;
  }
}

/**
 * 사용자 프로필 조회 (서버)
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await getServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // 프로필이 없는 경우
      return null;
    }
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

/**
 * 현재 로그인한 사용자의 프로필 조회 (서버)
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
  const supabase = await getServerClient();

  if (!supabase) {
    return null;
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  return getProfile(user.id);
}

/**
 * 사용자 선호도 기반 도시 추천 (서버)
 */
export async function getRecommendedCities(userId: string): Promise<City[]> {
  const profile = await getProfile(userId);

  if (!profile) {
    // 프로필이 없으면 기본 정렬 (좋아요 순)
    return cities.sort((a, b) => b.likes - a.likes);
  }

  // 사용자 선호도를 바탕으로 점수 계산
  const scoredCities = cities.map(city => {
    let score = 0;

    // 예산 선호도 점수 (30점)
    if (profile.preferred_budget && city.budget === profile.preferred_budget) {
      score += 30;
    }

    // 지역 선호도 점수 (20점)
    if (profile.preferred_regions && profile.preferred_regions.includes(city.region)) {
      score += 20;
    }

    // 환경 선호도 점수 (30점)
    if (profile.preferred_environments && profile.preferred_environments.length > 0) {
      const environmentMatches = city.environment.filter(env =>
        profile.preferred_environments!.includes(env)
      ).length;
      score += (environmentMatches / city.environment.length) * 30;
    }

    // 계절 선호도 점수 (20점)
    if (profile.preferred_seasons && profile.preferred_seasons.includes(city.bestSeason)) {
      score += 20;
    }

    return {
      ...city,
      recommendationScore: score
    };
  });

  // 추천 점수 순으로 정렬, 같은 점수면 좋아요 순으로 정렬
  return scoredCities.sort((a, b) => {
    if (b.recommendationScore !== a.recommendationScore) {
      return b.recommendationScore - a.recommendationScore;
    }
    return b.likes - a.likes;
  });
}

// 클라이언트 사이드 함수들

/**
 * 현재 사용자 프로필 조회 (클라이언트)
 */
export async function getCurrentUserProfileClient(): Promise<Profile | null> {
  const supabase = createClientClient();

  if (!supabase) {
    return null;
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching current user profile:', error);
    return null;
  }

  return data;
}

/**
 * 프로필 업데이트 (클라이언트)
 */
export async function updateProfile(profileData: ProfileUpdateRequest): Promise<Profile | null> {
  const supabase = createClientClient();

  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('User not authenticated');
    return null;
  }

  const updateData = {
    ...profileData,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }

  return data;
}

/**
 * 프로필 생성 (클라이언트 - 회원가입 시 사용)
 */
export async function createProfile(profileData: Partial<Profile>): Promise<Profile | null> {
  const supabase = createClientClient();

  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      email: user.email!,
      ...profileData
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return null;
  }

  return data;
}

/**
 * 현재 사용자 기반 추천 도시 조회 (클라이언트)
 */
export async function getRecommendedCitiesClient(): Promise<City[]> {
  const profile = await getCurrentUserProfileClient();

  if (!profile) {
    // 프로필이 없으면 기본 정렬 (좋아요 순)
    return cities.sort((a, b) => b.likes - a.likes);
  }

  // 사용자 선호도를 바탕으로 점수 계산
  const scoredCities = cities.map(city => {
    let score = 0;

    // 예산 선호도 점수 (30점)
    if (profile.preferred_budget && city.budget === profile.preferred_budget) {
      score += 30;
    }

    // 지역 선호도 점수 (20점)
    if (profile.preferred_regions && profile.preferred_regions.includes(city.region)) {
      score += 20;
    }

    // 환경 선호도 점수 (30점)
    if (profile.preferred_environments && profile.preferred_environments.length > 0) {
      const environmentMatches = city.environment.filter(env =>
        profile.preferred_environments!.includes(env)
      ).length;
      score += (environmentMatches / city.environment.length) * 30;
    }

    // 계절 선호도 점수 (20점)
    if (profile.preferred_seasons && profile.preferred_seasons.includes(city.bestSeason)) {
      score += 20;
    }

    return {
      ...city,
      recommendationScore: score
    };
  });

  // 추천 점수 순으로 정렬, 같은 점수면 좋아요 순으로 정렬
  return scoredCities.sort((a, b) => {
    if (b.recommendationScore !== a.recommendationScore) {
      return b.recommendationScore - a.recommendationScore;
    }
    return b.likes - a.likes;
  });
}

/**
 * 프로필 완성도 확인
 */
export function getProfileCompleteness(profile: Profile): {
  percentage: number;
  missingFields: string[];
} {
  const fields = [
    { key: 'display_name', label: '표시명' },
    { key: 'preferred_budget', label: '예산 선호도' },
    { key: 'preferred_regions', label: '지역 선호도' },
    { key: 'preferred_environments', label: '환경 선호도' },
    { key: 'preferred_seasons', label: '계절 선호도' }
  ];

  const missingFields: string[] = [];
  let completedFields = 0;

  fields.forEach(field => {
    const value = profile[field.key as keyof Profile];
    if (value && (typeof value === 'string' || (Array.isArray(value) && value.length > 0))) {
      completedFields++;
    } else {
      missingFields.push(field.label);
    }
  });

  return {
    percentage: Math.round((completedFields / fields.length) * 100),
    missingFields
  };
}

/**
 * 선호도 기반 필터링된 도시 목록
 */
export function filterCitiesByPreferences(
  profile: Profile | null,
  cities: City[],
  strictFilter: boolean = false
): City[] {
  if (!profile) return cities;

  return cities.filter(city => {
    const conditions: boolean[] = [];

    // 예산 조건
    if (profile.preferred_budget) {
      conditions.push(city.budget === profile.preferred_budget);
    }

    // 지역 조건
    if (profile.preferred_regions && profile.preferred_regions.length > 0) {
      conditions.push(profile.preferred_regions.includes(city.region));
    }

    // 환경 조건 (하나라도 일치하면 통과)
    if (profile.preferred_environments && profile.preferred_environments.length > 0) {
      const hasMatchingEnvironment = city.environment.some(env =>
        profile.preferred_environments!.includes(env)
      );
      conditions.push(hasMatchingEnvironment);
    }

    // 계절 조건
    if (profile.preferred_seasons && profile.preferred_seasons.length > 0) {
      conditions.push(profile.preferred_seasons.includes(city.bestSeason));
    }

    if (strictFilter) {
      // 모든 조건을 만족해야 함 (AND)
      return conditions.every(condition => condition);
    } else {
      // 하나라도 만족하면 됨 (OR)
      return conditions.length === 0 || conditions.some(condition => condition);
    }
  });
}