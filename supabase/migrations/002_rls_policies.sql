-- 워케이션 코리아 RLS (Row Level Security) 정책 설정
-- Migration: 002_rls_policies
-- Created: 2026-03-11

-- Enable Row Level Security for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES 테이블 RLS 정책
-- ============================================================================

-- 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 삽입 가능
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 모든 사용자는 다른 사용자의 기본 프로필 정보 조회 가능 (display_name, avatar_url)
CREATE POLICY "Users can view public profile info" ON profiles
  FOR SELECT USING (TRUE);

-- ============================================================================
-- CITY_INTERACTIONS 테이블 RLS 정책
-- ============================================================================

-- 모든 사용자는 도시별 상호작용 통계를 조회할 수 있음 (좋아요/싫어요 수)
CREATE POLICY "Anyone can view city interaction stats" ON city_interactions
  FOR SELECT USING (TRUE);

-- 사용자는 자신의 상호작용만 삽입 가능
CREATE POLICY "Users can insert own interactions" ON city_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 상호작용만 수정 가능
CREATE POLICY "Users can update own interactions" ON city_interactions
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 상호작용만 삭제 가능
CREATE POLICY "Users can delete own interactions" ON city_interactions
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- COMMENTS 테이블 RLS 정책
-- ============================================================================

-- 모든 사용자는 댓글을 조회할 수 있음
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (TRUE);

-- 로그인한 사용자만 댓글 작성 가능
CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 댓글만 수정 가능
CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 댓글만 삭제 가능
CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- NOTIFICATIONS 테이블 RLS 정책
-- ============================================================================

-- 사용자는 자신의 알림만 조회 가능
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 알림만 수정 가능 (읽음 처리)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- 시스템이 알림을 삽입할 수 있도록 허용 (서비스 역할)
-- 이 정책은 백엔드에서 알림 생성을 위해 필요
CREATE POLICY "Service role can insert notifications" ON notifications
  FOR INSERT WITH CHECK (TRUE);

-- ============================================================================
-- 도시별 통계 조회를 위한 VIEW 생성
-- ============================================================================

-- 도시별 좋아요/싫어요 통계를 쉽게 조회할 수 있는 뷰
CREATE OR REPLACE VIEW city_stats AS
SELECT
  city_id,
  COUNT(*) FILTER (WHERE interaction_type = 'like') as likes,
  COUNT(*) FILTER (WHERE interaction_type = 'dislike') as dislikes,
  COUNT(*) as total_interactions
FROM city_interactions
GROUP BY city_id;

-- 뷰에 대한 권한 설정
GRANT SELECT ON city_stats TO authenticated;
GRANT SELECT ON city_stats TO anon;

-- ============================================================================
-- 댓글 관련 함수들
-- ============================================================================

-- 댓글 수를 카운트하는 함수
CREATE OR REPLACE FUNCTION get_comment_count(target_city_id INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM comments
    WHERE city_id = target_city_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 대댓글 수를 카운트하는 함수
CREATE OR REPLACE FUNCTION get_reply_count(target_comment_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM comments
    WHERE parent_comment_id = target_comment_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;