-- 워케이션 코리아 초기 데이터베이스 스키마
-- Migration: 001_initial_schema
-- Created: 2026-03-11

-- 1. 사용자 프로필 테이블
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  -- 여행 선호도
  preferred_budget TEXT CHECK (preferred_budget IN ('100만원 이하', '100-200만원', '200만원 이상')),
  preferred_regions TEXT[], -- 복수 선택 가능: ['수도권', '경상도', '전라도', '강원도', '제주도', '충청도']
  preferred_environments TEXT[], -- 복수 선택 가능: ['자연친화', '도심선호', '카페작업', '코워킹 필수']
  preferred_seasons TEXT[], -- 복수 선택 가능: ['봄', '여름', '가을', '겨울']
  -- 메타 정보
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 도시 상호작용 테이블 (좋아요/싫어요)
CREATE TABLE city_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  city_id INTEGER NOT NULL, -- 정적 도시 데이터의 ID 참조
  interaction_type TEXT CHECK (interaction_type IN ('like', 'dislike')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, city_id) -- 한 사용자는 도시당 하나의 상호작용만
);

-- 3. 댓글 시스템 테이블
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  city_id INTEGER NOT NULL, -- 정적 도시 데이터의 ID 참조
  content TEXT NOT NULL CHECK (length(content) > 0 AND length(content) <= 1000),
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글 지원
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 알림 테이블
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('new_city', 'comment_reply', 'like_milestone', 'new_comment')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- 추가 메타데이터 (city_id, comment_id 등)
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_city_interactions_city_id ON city_interactions(city_id);
CREATE INDEX idx_city_interactions_user_id ON city_interactions(user_id);
CREATE INDEX idx_comments_city_id ON comments(city_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_comment_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- 함수: 프로필 자동 생성 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거: 새 사용자 등록 시 프로필 자동 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();