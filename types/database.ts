/**
 * Supabase 데이터베이스 타입 정의
 * 워케이션 코리아 프로젝트
 */

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_budget: '100만원 이하' | '100-200만원' | '200만원 이상' | null;
  preferred_regions: string[] | null;
  preferred_environments: string[] | null;
  preferred_seasons: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CityInteraction {
  id: string;
  user_id: string;
  city_id: number;
  interaction_type: 'like' | 'dislike';
  created_at: string;
  updated_at: string;
}

export interface CityStats {
  city_id: number;
  likes: number;
  dislikes: number;
  total_interactions: number;
}

export interface Comment {
  id: string;
  user_id: string;
  city_id: number;
  content: string;
  parent_comment_id: string | null;
  created_at: string;
  updated_at: string;
  // Join된 프로필 정보
  profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  };
  // 대댓글 개수
  reply_count?: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'new_city' | 'comment_reply' | 'like_milestone' | 'new_comment';
  title: string;
  message: string;
  data: Record<string, any> | null;
  is_read: boolean;
  created_at: string;
}

// API 요청/응답 타입
export interface ToggleInteractionRequest {
  cityId: number;
  type: 'like' | 'dislike';
}

export interface ToggleInteractionResponse {
  success: boolean;
  interaction: CityInteraction | null;
  stats: CityStats;
}

export interface ProfileUpdateRequest {
  display_name?: string;
  avatar_url?: string;
  preferred_budget?: '100만원 이하' | '100-200만원' | '200만원 이상';
  preferred_regions?: string[];
  preferred_environments?: string[];
  preferred_seasons?: string[];
}

export interface CreateCommentRequest {
  cityId: number;
  content: string;
  parentCommentId?: string;
}

// Supabase Database 타입 (자동 생성될 수 있지만 수동으로 정의)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      city_interactions: {
        Row: CityInteraction;
        Insert: Omit<CityInteraction, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CityInteraction, 'id' | 'created_at' | 'updated_at'>>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id' | 'created_at'>>;
      };
    };
    Views: {
      city_stats: {
        Row: CityStats;
      };
    };
    Functions: {
      get_comment_count: {
        Args: { target_city_id: number };
        Returns: number;
      };
      get_reply_count: {
        Args: { target_comment_id: string };
        Returns: number;
      };
    };
  };
}