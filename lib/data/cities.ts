import { City } from "@/types/city";

/**
 * 워케이션 코리아 - MVP 도시 데이터
 * 6개 도시: 제주시, 부산, 강릉, 경주, 전주, 성수
 * 
 * Phase 2: 필터 시스템 테스트를 위한 임시 데이터
 * Phase 4에서 완전히 재구성할 예정
 */

export const cities: City[] = [
  {
    id: 1,
    name: "제주시",
    region: "제주도",
    tags: ["#바다뷰", "#카페천국", "#힐링"],
    art: `    +--------+
    |  ~  ~  |
    | ~~[J]~~|
    |  ~  ~  |
    +--------+`,
    budget: "200만원 이상",
    environment: ["자연친화", "카페작업"],
    bestSeason: "봄",
    likes: 128,
    dislikes: 15,
  },
  {
    id: 2,
    name: "부산",
    region: "경상도",
    tags: ["#해운대", "#IT밸리", "#야경"],
    art: `    +--------+
    | /^^^^^\\ |
    | |[B]  | |
    | \\~~~~~/ |
    +--------+`,
    budget: "100-200만원",
    environment: ["도심선호", "카페작업", "코워킹 필수"],
    bestSeason: "봄",
    likes: 96,
    dislikes: 12,
  },
  {
    id: 3,
    name: "강릉",
    region: "강원도",
    tags: ["#커피도시", "#오션뷰", "#조용"],
    art: `    +--------+
    | ☕ ☕ ☕ |
    | [G]~~~~|
    | ~~~~~~ |
    +--------+`,
    budget: "100-200만원",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 84,
    dislikes: 8,
  },
  {
    id: 4,
    name: "경주",
    region: "경상도",
    tags: ["#역사도시", "#한옥카페", "#평온"],
    art: `    +--------+
    |  /^^\\  |
    | |[K]|  |
    |  \\__/  |
    +--------+`,
    budget: "100만원 이하",
    environment: ["자연친화"],
    bestSeason: "가을",
    likes: 52,
    dislikes: 6,
  },
  {
    id: 5,
    name: "전주",
    region: "전라도",
    tags: ["#한옥마을", "#맛집천국", "#전통"],
    art: `    +--------+
    | {[J]} |
    | /----\\ |
    | |    | |
    +--------+`,
    budget: "100-200만원",
    environment: ["자연친화", "카페작업"],
    bestSeason: "가을",
    likes: 68,
    dislikes: 7,
  },
  {
    id: 6,
    name: "성수",
    region: "수도권",
    tags: ["#힙스터", "#카페밀집", "#IT"],
    art: `    +--------+
    | [S]@@@ |
    | ##### |
    | ##### |
    +--------+`,
    budget: "200만원 이상",
    environment: ["도심선호", "카페작업", "코워킹 필수"],
    bestSeason: "겨울",
    likes: 142,
    dislikes: 18,
  }
];

/**
 * 지역별 도시 개수
 */
export const getRegionCount = () => {
  const regions = cities.reduce((acc, city) => {
    acc[city.region] = (acc[city.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return regions;
};

/**
 * 총 좋아요 개수
 */
export const getTotalLikes = () => {
  return cities.reduce((sum, city) => sum + city.likes, 0);
};
