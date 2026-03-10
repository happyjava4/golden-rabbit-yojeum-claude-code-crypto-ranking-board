"use client";

import { City } from "@/types/city";
import { asciiBar, stars, getNomadScoreBg, getMetricColor } from "@/lib/ascii-utils";
import { Card } from "@/components/ui/card";

interface CityCardProps {
  city: City;
  onClick: () => void;
}

export function CityCard({ city, onClick }: CityCardProps) {
  const metrics = [
    { label: "생활비", value: city.cost },
    { label: "인터넷", value: city.internet },
    { label: "카페", value: city.cafe },
    { label: "안전", value: city.safety },
    { label: "분위기", value: city.vibe },
  ];

  return (
    <Card
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--green))] hover:shadow-lg hover:shadow-[rgb(var(--green))]/20"
    >
      {/* 노마드 점수 뱃지 */}
      <div className={`absolute right-3 top-3 rounded px-2 py-1 text-xs font-bold ${getNomadScoreBg(city.nomadScore)} text-[rgb(var(--bg))]`}>
        {city.nomadScore}
      </div>

      <div className="p-4">
        {/* 상단 타이틀 바 (터미널 스타일) */}
        <div className="mb-3 flex items-center gap-2 border-b border-[rgb(var(--border))] pb-2">
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--red))]" />
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--amber))]" />
            <div className="h-3 w-3 rounded-full bg-[rgb(var(--green))]" />
          </div>
          <span className="text-xs text-[rgb(var(--dim))]">
            city_{String(city.id).padStart(3, "0")}_{city.name}.dat
          </span>
        </div>

        {/* ASCII 아트 + 도시 정보 */}
        <div className="mb-4 flex gap-4">
          {/* ASCII 아트 */}
          <pre className="flex-shrink-0 text-[rgb(var(--green))] text-xs leading-tight">
            {city.art}
          </pre>

          {/* 도시 정보 */}
          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold text-[rgb(var(--green))]">
              {city.name}
            </h3>
            <div className="mb-2 text-xs text-[rgb(var(--dim))]">
              LOC :: {city.region} // {city.bestSeason}
            </div>
            <div className="flex flex-wrap gap-1">
              {city.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`rounded px-2 py-0.5 text-xs font-bold ${
                    idx === 0
                      ? "bg-[rgb(var(--green))]/20 text-[rgb(var(--green))]"
                      : "bg-[rgb(var(--cyan))]/20 text-[rgb(var(--cyan))]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 지표 바 */}
        <div className="mb-4 space-y-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2 text-xs">
              <span className="w-16 text-[rgb(var(--dim))]">{metric.label}</span>
              <div className="flex-1">
                <div className="h-2 w-full overflow-hidden rounded-sm bg-[rgb(var(--bg))]">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${metric.value}%`,
                      backgroundColor: getMetricColor(metric.value),
                    }}
                  />
                </div>
              </div>
              <span className="font-mono text-[rgb(var(--text))]">
                {asciiBar(metric.value, 10)}
              </span>
            </div>
          ))}
        </div>

        {/* 하단: 가격 + 별점 */}
        <div className="flex items-center justify-between border-t border-[rgb(var(--border))] pt-3">
          <div className="text-sm">
            <div className="text-xs text-[rgb(var(--dim))]">월 생활비</div>
            <div className="font-bold text-[rgb(var(--amber))]">{city.monthlyRent}</div>
          </div>
          <div className="text-right text-sm">
            <div className="text-[rgb(var(--amber))]">{stars(city.score)}</div>
            <div className="text-xs text-[rgb(var(--dim))]">{city.score} ({city.reviews}개)</div>
          </div>
        </div>
      </div>

      {/* 호버 CTA 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--bg))]/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded border-2 border-[rgb(var(--green))] bg-[rgb(var(--panel))] px-6 py-3 font-bold text-[rgb(var(--green))]">
          [ ENTER ]
        </div>
      </div>
    </Card>
  );
}
