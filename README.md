# 🇰🇷 워케이션 코리아 (Workcation Korea)

![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)

내가 일하기 가장 좋은 한국의 도시를 찾아보세요 🏙️

## 📖 프로젝트 소개

워케이션 코리아는 디지털 노마드와 원격근무자를 위한 한국 도시 정보 플랫폼입니다. 
생활비, 인터넷 속도, 카페 인프라, 안전, 분위기 등 5가지 핵심 지표로 도시를 비교하고, 
실제 워케이션 경험을 공유할 수 있습니다.

### ✨ 주요 기능

- 🏙️ **6개 도시 데이터**: 제주시, 부산, 강릉, 경주, 전주, 성수
- 📊 **5가지 핵심 지표**: 생활비, 인터넷 속도, 카페, 안전, 분위기
- 🎨 **터미널 ASCII 테마**: 독특한 레트로 디자인
- 🔍 **실시간 필터링**: 지역별 필터 + 5가지 정렬 옵션
- ⭐ **리뷰 시스템**: 별점 + 텍스트 리뷰 작성
- 📱 **반응형 디자인**: 모바일(375px)부터 데스크톱까지 완벽 대응

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Architecture**: Server Components 우선 + Client Components (인터랙션)

## 📂 프로젝트 구조

```
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (메타데이터)
│   ├── page.tsx            # 홈페이지 (Server Component)
│   └── globals.css         # 터미널 테마 스타일
├── components/
│   ├── navigation.tsx      # 상단 네비게이션
│   ├── hero.tsx            # 히어로 섹션
│   ├── filter-bar.tsx      # 필터 + 정렬 바 (Client)
│   ├── city-grid.tsx       # 도시 그리드 컨테이너 (Client)
│   ├── city-card.tsx       # 도시 카드 (Client)
│   ├── city-modal.tsx      # 도시 상세 모달 (Client)
│   ├── review-cta.tsx      # 리뷰 CTA 배너
│   └── ui/                 # Shadcn UI 컴포넌트
├── lib/
│   ├── data/
│   │   └── cities.ts       # 도시 Mock 데이터
│   ├── ascii-utils.ts      # ASCII 바, 별점 유틸
│   └── utils.ts            # Shadcn cn() 유틸
└── types/
    └── city.ts             # 도시 타입 정의
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000) 접속

## 🎨 디자인 시스템

### 터미널 컬러 팔레트

```css
--green:      #00ff88   /* 메인 포인트 */
--green-dim:  #00aa55   /* 보조 그린 */
--amber:      #ffb000   /* 가격/별점 강조 */
--cyan:       #00ffee   /* 보조 강조 */
--red:        #ff4444   /* 오류/단점 */
--bg:         #050e08   /* 배경 */
--panel:      #070f0a   /* 카드 배경 */
--border:     #1a4a2a   /* 테두리 */
--text:       #b0ffcc   /* 본문 텍스트 */
--dim:        #3a6a4a   /* 보조 텍스트 */
```

### CRT 스캔라인 효과

- 레트로 터미널 느낌을 위한 스캔라인 오버레이
- monospace 폰트 (Courier New, Consolas, Monaco)

## 📊 데이터 구조

```typescript
interface City {
  id: number;
  name: string;
  region: Region;
  tags: string[];
  art: string; // ASCII 아트
  
  // 지표 (0~100)
  cost: number;
  internet: number;
  cafe: number;
  safety: number;
  vibe: number;
  
  // 원시 데이터
  monthlyRent: string;
  mbps: string;
  coworking: number;
  cafes: number;
  bestSeason: string;
  
  // 리뷰
  reviews: number;
  score: number; // 1~5
  
  // 장단점
  pros: string[];
  cons: string[];
  
  nomadScore: number; // 종합 점수
}
```

## 🔮 향후 계획 (v2)

- [ ] 지도 뷰 (카카오맵 연동)
- [ ] 커뮤니티 게시판
- [ ] 노마드 매칭/데이팅
- [ ] 밋업 시스템
- [ ] AI 도시 추천 (NomadGPT)
- [ ] 실시간 리뷰 알림
- [ ] 유료 멤버십 (플라이휠 전환)

## 📝 라이선스

이 프로젝트는 교육 목적의 MVP입니다.

## 👥 기여

PR과 이슈는 언제나 환영합니다!

---

Made with ❤️ for Digital Nomads in Korea
