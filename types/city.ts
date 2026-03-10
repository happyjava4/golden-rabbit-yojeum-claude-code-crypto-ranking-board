/**
 * 도시 데이터 타입 정의
 * MVP 버전 - 워케이션 코리아
 */

export type Region = "제주" | "강원" | "경상" | "전라" | "서울" | "전체";

export interface City {
  id: number;
  name: string;
  region: Region;
  tags: string[];
  art: string; // ASCII 아트

  // 지표 (0~100 정규화)
  cost: number; // 생활비 합리성
  internet: number; // 인터넷 속도
  cafe: number; // 카페 인프라
  safety: number; // 안전
  vibe: number; // 전체 분위기

  // 표시용 원시 데이터
  monthlyRent: string; // 월세 범위
  mbps: string; // 인터넷 속도
  coworking: number; // 코워킹 스페이스 수
  cafes: number; // 카페 수
  bestSeason: string; // 최적 시즌

  // 리뷰 집계
  reviews: number; // 총 리뷰 수
  score: number; // 평균 별점 (1~5)

  // 장단점
  pros: string[];
  cons: string[];

  // 노마드 점수 (종합 점수)
  nomadScore: number;
}

export type SortOption =
  | "nomadScore"
  | "costLow"
  | "internetFast"
  | "cafeRich"
  | "reviewsMany";

export interface FilterState {
  region: Region;
  sort: SortOption;
}
