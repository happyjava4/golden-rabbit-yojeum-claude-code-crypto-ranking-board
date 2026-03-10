import { City } from "@/types/city";

/**
 * 워케이션 코리아 - MVP 도시 데이터
 * 6개 도시: 제주시, 부산, 강릉, 경주, 전주, 성수
 */

export const cities: City[] = [
  {
    id: 1,
    name: "제주시",
    region: "제주",
    tags: ["#바다뷰", "#카페천국", "#힐링"],
    art: `    +--------+
    |  ~  ~  |
    | ~~[J]~~|
    |  ~  ~  |
    +--------+`,
    cost: 45, // 생활비 합리성 (낮을수록 비쌈)
    internet: 95, // 인터넷 속도
    cafe: 98, // 카페 인프라
    safety: 92, // 안전
    vibe: 88, // 전체 분위기
    monthlyRent: "60~90만원",
    mbps: "380Mbps",
    coworking: 12,
    cafes: 450,
    bestSeason: "3~6월, 9~11월",
    reviews: 128,
    score: 4.6,
    pros: [
      "전국 최고 수준의 카페 인프라",
      "바다를 보며 일할 수 있는 워크스페이스",
      "1년 내내 온화한 기후"
    ],
    cons: [
      "높은 숙박비와 생활비",
      "성수기 관광객 혼잡",
      "렌터카 필수로 교통비 부담"
    ],
    nomadScore: 84
  },
  {
    id: 2,
    name: "부산",
    region: "경상",
    tags: ["#해운대", "#IT밸리", "#야경"],
    art: `    +--------+
    | /^^^^^\\ |
    | |[B]  | |
    | \\~~~~~/ |
    +--------+`,
    cost: 55,
    internet: 98,
    cafe: 85,
    safety: 88,
    vibe: 82,
    monthlyRent: "50~80만원",
    mbps: "420Mbps",
    coworking: 18,
    cafes: 380,
    bestSeason: "4~6월, 9~10월",
    reviews: 96,
    score: 4.4,
    pros: [
      "서울 다음으로 큰 IT 생태계",
      "해운대, 광안리 등 워크스페이스 다양",
      "KTX 2시간 30분으로 서울 접근성 양호"
    ],
    cons: [
      "여름 피서철 숙박비 급등",
      "일부 지역 교통 혼잡",
      "카페 밀집도는 제주보다 낮음"
    ],
    nomadScore: 79
  },
  {
    id: 3,
    name: "강릉",
    region: "강원",
    tags: ["#커피도시", "#오션뷰", "#조용"],
    art: `    +--------+
    | ☕ ☕ ☕ |
    | [G]~~~~|
    | ~~~~~~ |
    +--------+`,
    cost: 60,
    internet: 92,
    cafe: 94,
    safety: 95,
    vibe: 90,
    monthlyRent: "45~70만원",
    mbps: "350Mbps",
    coworking: 8,
    cafes: 280,
    bestSeason: "5~6월, 9~10월",
    reviews: 84,
    score: 4.7,
    pros: [
      "한국 커피 문화의 성지, 로스터리 카페 풍부",
      "조용하고 집중하기 좋은 분위기",
      "합리적인 숙박비"
    ],
    cons: [
      "겨울 매우 추움 (-10℃ 이하)",
      "코워킹 스페이스 부족",
      "서울에서 KTX 2시간"
    ],
    nomadScore: 82
  },
  {
    id: 4,
    name: "경주",
    region: "경상",
    tags: ["#역사도시", "#한옥카페", "#평온"],
    art: `    +--------+
    |  /^^\\  |
    | |[K]|  |
    |  \\__/  |
    +--------+`,
    cost: 70,
    internet: 88,
    cafe: 75,
    safety: 93,
    vibe: 85,
    monthlyRent: "35~60만원",
    mbps: "320Mbps",
    coworking: 4,
    cafes: 150,
    bestSeason: "4~5월, 10~11월",
    reviews: 52,
    score: 4.3,
    pros: [
      "전국 최저 수준의 생활비",
      "한적하고 힐링하기 좋은 분위기",
      "역사 유적지 탐방 가능"
    ],
    cons: [
      "카페 및 워크스페이스 선택지 제한적",
      "IT 커뮤니티 부재",
      "대중교통 불편, 렌터카 권장"
    ],
    nomadScore: 71
  },
  {
    id: 5,
    name: "전주",
    region: "전라",
    tags: ["#한옥마을", "#맛집천국", "#전통"],
    art: `    +--------+
    | {[J]} |
    | /----\\ |
    | |    | |
    +--------+`,
    cost: 65,
    internet: 90,
    cafe: 80,
    safety: 91,
    vibe: 83,
    monthlyRent: "40~65만원",
    mbps: "340Mbps",
    coworking: 6,
    cafes: 200,
    bestSeason: "4~5월, 10~11월",
    reviews: 68,
    score: 4.5,
    pros: [
      "저렴한 생활비와 맛집 천국",
      "한옥마을 주변 감성 카페 다수",
      "서울에서 KTX 2시간"
    ],
    cons: [
      "코워킹 스페이스 부족",
      "주말 한옥마을 관광객 혼잡",
      "카페 와이파이 속도 편차 큼"
    ],
    nomadScore: 75
  },
  {
    id: 6,
    name: "성수",
    region: "서울",
    tags: ["#힙스터", "#카페밀집", "#IT"],
    art: `    +--------+
    | [S]@@@ |
    | ##### |
    | ##### |
    +--------+`,
    cost: 30,
    internet: 100,
    cafe: 96,
    safety: 85,
    vibe: 92,
    monthlyRent: "80~120만원",
    mbps: "500Mbps",
    coworking: 25,
    cafes: 320,
    bestSeason: "연중",
    reviews: 142,
    score: 4.5,
    pros: [
      "전국 최고 인터넷 속도와 IT 인프라",
      "힙한 카페와 코워킹 스페이스 밀집",
      "스타트업 생태계 및 네트워킹 기회"
    ],
    cons: [
      "높은 월세와 생활비",
      "주말 관광객으로 인한 혼잡",
      "주차 및 교통 불편"
    ],
    nomadScore: 77
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
 * 총 리뷰 개수
 */
export const getTotalReviews = () => {
  return cities.reduce((sum, city) => sum + city.reviews, 0);
};
