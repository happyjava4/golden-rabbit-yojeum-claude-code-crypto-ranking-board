# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 프로젝트 개요

Next.js 15.2.4와 React 19로 구축된 암호화폐 순위 대시보드입니다. 가격, 시가총액, 거래량, 24시간 변동률 등의 암호화폐 정보를 한국어로 표시합니다.

## 개발 명령어

```bash
# 의존성 설치 (pnpm 9.1.1 사용)
pnpm install

# 개발 서버 시작
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start

# 테스트 실행 (Jest + Testing Library 설정됨)
pnpm test

# 워치 모드로 테스트 실행
pnpm test --watch

# 특정 테스트 파일 실행
pnpm test [test-file-name]

# ESLint 설정 필요 - 현재 미설정 상태
pnpm lint  # ESLint 설정 프롬프트가 표시됨
```

## 아키텍처 개요

### 애플리케이션 구조
Next.js 15 App Router 패턴을 따르는 최소한의 단일 페이지 아키텍처:

- **루트 컴포넌트**: `crypto-ranking-board.tsx` - 모든 비즈니스 로직을 포함하는 독립형 컴포넌트
- **페이지 래퍼**: `app/page.tsx` - 단순한 import/export 래퍼
- **레이아웃**: `app/layout.tsx` - 한국어 로케일(`lang="ko"`)을 포함한 메타데이터 및 HTML 구조

### 데이터 아키텍처
**정적 모의 데이터 패턴**: 현재 8개 암호화폐를 포함한 하드코딩된 `mockCoinData` 배열을 사용합니다. 데이터 구조는 향후 API 통합을 고려하여 설계되었습니다:

```typescript
interface CoinData {
  rank: number
  name: string      // 한국어 이름 (예: "비트코인")
  symbol: string    // 표준 심볼 (예: "BTC")
  price: number
  change24h: number // 백분율 변화
  marketCap: number
  volume: number
  logo: string     // /public/coin/[name].[ext] 경로
}
```

### UI/UX 아키텍처
- **디자인 시스템**: 포괄적인 Radix UI 프리미티브 커버리지(40개 이상 컴포넌트 사용 가능)를 갖춘 shadcn/ui 컴포넌트
- **테마**: `app/globals.css`에서 CSS 변수를 통한 CSS-in-JS 방식으로 완전한 라이트/다크 모드 지원
- **반응형 전략**: 시가총액 및 거래량 컬럼에 `hidden md:table-cell` 및 `hidden lg:table-cell`을 사용한 점진적 노출
- **지역화**: 한국어 암호화폐 이름을 사용하는 한국어 중심 UI

### 빌드 설정
`next.config.mjs`의 **개발 최적화 설정**:
- 빌드 중 ESLint 및 TypeScript 오류 무시 (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`)
- 이미지 최적화 비활성화 (`unoptimized: true`)
- 이러한 설정은 프로덕션 준비보다는 개발 속도를 우선시함

## 테스트 인프라

Jest 및 React Testing Library가 완전히 설정되어 있음:
- **설정**: TypeScript 지원 및 경로 매핑이 포함된 `jest.config.mjs`
- **셋업**: 테스트 환경 설정을 위한 `jest.setup.js`
- **커버리지**: `.next/`, `node_modules/`, 설정 파일 제외하도록 구성됨
- **테스트 패턴**: `**/__tests__/**/*` 및 `**/*.{spec,test}.*`

## 주요 구현 세부사항

### 숫자 포맷팅 전략
모든 숫자 표시를 처리하는 두 가지 유틸리티 함수:
- `formatNumber()`: 시가총액/거래량을 위해 큰 숫자를 K/M/B/T 표기법으로 변환
- `formatPrice()`: 적절한 소수점 자리수로 가격 포맷팅 (< $1일 때 4자리 소수점)

### 반응형 디자인 패턴
점진적 개선을 위한 Tailwind의 반응형 접두사 사용:
- 기본: 순위, 이름, 가격, 24시간 변동률 (항상 표시)
- `md:` 브레이크포인트: + 시가총액
- `lg:` 브레이크포인트: + 24시간 거래량

### 자산 관리
암호화폐 로고는 `/public/coin/`에 혼합 형식(.png, .webp)으로 저장되어 체계적인 접근보다는 유기적인 자산 수집을 나타냄.

## 개발 고려사항

1. **ESLint 설정**: 린팅을 활성화할 준비가 되면 `pnpm lint`를 실행하고 설정 선택
2. **API 통합 지점**: `crypto-ranking-board.tsx`의 `mockCoinData` 배열을 실제 데이터 페칭으로 교체
3. **빌드 품질**: `ignoreDuringBuilds: false` 및 `ignoreBuildErrors: false`로 설정하여 TypeScript/ESLint 검사 활성화 고려
4. **이미지 최적화**: 프로덕션을 위해 `unoptimized: true`를 제거하여 Next.js 이미지 최적화 활성화

## 상태 관리

현재 상태 없음 - 모든 데이터가 정적입니다. 향후 API 통합에는 다음이 필요할 가능성:
- 데이터 페칭 훅 또는 서버 컴포넌트
- 로딩/에러 상태
- 실시간 업데이트 메커니즘 (WebSocket/폴링)