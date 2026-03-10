/**
 * 도시 데이터 타입 정의
 * MVP 버전 - 워케이션 코리아
 */

// 새로운 필터 타입 정의
export type Budget = "100만원 이하" | "100-200만원" | "200만원 이상";
export type Region = "전체" | "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type BestSeason = "봄" | "여름" | "가을" | "겨울";

export interface City {
  id: number;
  name: string;
  tags: string[];
  art: string; // ASCII 아트

  // 새로운 필터 필드
  budget: Budget;
  region: Region;
  environment: Environment[]; // 복수 선택 가능
  bestSeason: BestSeason;

  // 좋아요/싫어요 시스템
  likes: number;
  dislikes: number;
}
