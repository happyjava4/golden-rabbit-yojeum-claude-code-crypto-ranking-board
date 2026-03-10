import { cities, getTotalReviews } from "@/lib/data/cities";

export function Hero() {
  const totalCities = cities.length;
  const totalReviews = getTotalReviews();

  return (
    <section className="relative border-b border-[rgb(var(--border))] bg-gradient-to-b from-[rgb(var(--bg))] to-[rgb(var(--panel))] py-16 md:py-24">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgb(var(--green)) 20px,
              rgb(var(--green)) 21px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgb(var(--green)) 20px,
              rgb(var(--green)) 21px
            )`,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        {/* 메인 헤드카피 */}
        <h1 className="mb-4 text-4xl font-bold leading-tight text-[rgb(var(--green))] md:text-5xl lg:text-6xl">
          내가 일하기 가장 좋은
          <br />
          한국의 도시를 찾아보세요
        </h1>

        {/* 서브카피 */}
        <p className="mb-8 text-lg text-[rgb(var(--text))] md:text-xl">
          생활비 · 인터넷 속도 · 카페 인프라 · 안전 · 분위기
          <br className="hidden sm:block" />
          5가지 핵심 지표로 비교하는 워케이션 도시 가이드
        </p>

        {/* 통계 뱃지 */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="rounded border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-4 py-2">
            <span className="text-[rgb(var(--cyan))]">🏙️ {totalCities}개 도시</span>
          </div>
          <div className="rounded border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-4 py-2">
            <span className="text-[rgb(var(--amber))]">⭐ {totalReviews}개 리뷰</span>
          </div>
          <div className="rounded border border-[rgb(var(--border))] bg-[rgb(var(--panel))] px-4 py-2">
            <span className="text-[rgb(var(--green))]">👥 커뮤니티 무료</span>
          </div>
        </div>
      </div>
    </section>
  );
}
