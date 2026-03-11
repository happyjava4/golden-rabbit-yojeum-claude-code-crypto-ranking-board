import { City, Region } from "@/types/city";

/**
 * 워케이션 코리아 - MVP 도시 데이터
 * 6개 도시: 제주시, 부산, 강릉, 경주, 전주, 성수
 * 
 * Phase 4: 완전히 재구성된 데이터
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
    likes: 245,
    dislikes: 12,
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
    environment: ["도심선호", "카페작업"],
    bestSeason: "여름",
    likes: 189,
    dislikes: 23,
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
    budget: "100만원 이하",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 156,
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
    environment: ["자연친화", "도심선호"],
    bestSeason: "가을",
    likes: 134,
    dislikes: 15,
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
    budget: "100만원 이하",
    environment: ["도심선호", "카페작업"],
    bestSeason: "가을",
    likes: 167,
    dislikes: 11,
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
    environment: ["도심선호", "코워킹 필수", "카페작업"],
    bestSeason: "봄",
    likes: 298,
    dislikes: 45,
  }
];

type ConcreteRegion = Exclude<Region, "전체">;

const isConcreteRegion = (region: Region): region is ConcreteRegion => region !== "전체";

/**
 * 지역별 도시 개수
 */
export const getRegionCount = (): Record<ConcreteRegion, number> => {
  const initialCounts: Record<ConcreteRegion, number> = {
    수도권: 0,
    경상도: 0,
    전라도: 0,
    강원도: 0,
    제주도: 0,
    충청도: 0,
  };

  return cities.reduce((acc, city) => {
    if (isConcreteRegion(city.region)) {
      acc[city.region] += 1;
    }
    return acc;
  }, { ...initialCounts });
};

/**
 * 총 좋아요 개수
 */
export const getTotalLikes = (): number => {
  return cities.reduce((sum, city) => sum + city.likes, 0);
};

/**
 * 좋아요 순으로 정렬된 도시 목록
 */
export const getSortedByLikes = (): City[] => {
  return [...cities].sort((a, b) => b.likes - a.likes);
};

/**
 * ID로 도시 찾기
 */
export const getCityById = (id: number): City | undefined => {
  return cities.find((city) => city.id === id);
};
