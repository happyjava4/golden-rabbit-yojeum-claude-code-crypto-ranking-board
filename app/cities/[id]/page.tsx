import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cities, getCityById } from "@/lib/data/cities";

interface CityDetailPageProps {
  params: {
    id: string;
  };
}

export const generateStaticParams = () => {
  return cities.map((city) => ({ id: city.id.toString() }));
};

export default function CityDetailPage({ params }: CityDetailPageProps) {
  const cityId = Number(params.id);
  if (Number.isNaN(cityId)) {
    notFound();
  }

  const city = getCityById(cityId);
  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[rgb(var(--bg))]">
      <Navigation />

      <section className="border-b border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[rgb(var(--dim))]">도시 상세 페이지</p>
              <h1 className="text-3xl font-bold text-[rgb(var(--green))]">
                {city.name}
              </h1>
              <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">
                {city.region} · {city.bestSeason} 추천
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/">← 도시 리스트로</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <pre className="w-full max-w-xs text-[rgb(var(--green))] text-sm leading-tight">
              {city.art}
            </pre>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {city.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded px-3 py-1 text-xs font-bold bg-[rgb(var(--green))]/15 text-[rgb(var(--green))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 text-sm">
                <div>
                  <p className="text-[rgb(var(--dim))]">예산</p>
                  <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                    {city.budget}
                  </p>
                </div>
                <div>
                  <p className="text-[rgb(var(--dim))]">작업 환경</p>
                  <p className="text-[rgb(var(--text-primary))]">
                    {city.environment.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="text-[rgb(var(--dim))]">추천 계절</p>
                  <p className="text-[rgb(var(--text-primary))]">{city.bestSeason}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-6">
            <h2 className="text-lg font-semibold text-[rgb(var(--green))]">
              커뮤니티 반응
            </h2>
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div>
                <p className="text-[rgb(var(--dim))]">👍 좋아요</p>
                <p className="text-xl font-bold text-[rgb(var(--green))]">
                  {city.likes}
                </p>
              </div>
              <div>
                <p className="text-[rgb(var(--dim))]">👎 싫어요</p>
                <p className="text-xl font-bold text-[rgb(var(--red))]">
                  {city.dislikes}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-6">
            <h2 className="text-lg font-semibold text-[rgb(var(--green))]">
              추천 이유
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[rgb(var(--text-primary))]">
              <li>{city.bestSeason}에 가장 아름다운 풍경을 즐길 수 있어요.</li>
              <li>{city.environment.join("/ ")} 중심의 인프라가 잘 갖춰져 있어요.</li>
              <li>예산 {city.budget} 기준으로 워케이션 계획이 쉬워요.</li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
  );
}
