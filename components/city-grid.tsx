"use client";

import { useState, useMemo } from "react";
import { City, Budget, Region, Environment, BestSeason } from "@/types/city";
import { FilterBar } from "./filter-bar";
import { CityCard } from "./city-card";

interface CityGridProps {
  cities: City[];
}

export function CityGrid({ cities }: CityGridProps) {
  // 새로운 필터 상태 관리
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region>("전체");
  const [selectedEnvironments, setSelectedEnvironments] = useState<Environment[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<BestSeason | null>(null);

  // 필터링 로직 - AND 조건 (환경은 OR 조건)
  const filteredCities = useMemo(() => {
    let result = [...cities];

    // 예산 필터
    if (selectedBudget !== null) {
      result = result.filter((city) => city.budget === selectedBudget);
    }

    // 지역 필터
    if (selectedRegion !== "전체") {
      result = result.filter((city) => city.region === selectedRegion);
    }

    // 환경 필터 (OR 조건 - 하나라도 일치하면 표시)
    if (selectedEnvironments.length > 0) {
      result = result.filter((city) =>
        city.environment.some((env) => selectedEnvironments.includes(env))
      );
    }

    // 계절 필터
    if (selectedSeason !== null) {
      result = result.filter((city) => city.bestSeason === selectedSeason);
    }

    return result.sort((a, b) => b.likes - a.likes);
  }, [cities, selectedBudget, selectedRegion, selectedEnvironments, selectedSeason]);

  return (
    <>
      <FilterBar
        selectedBudget={selectedBudget}
        onBudgetChange={setSelectedBudget}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedEnvironments={selectedEnvironments}
        onEnvironmentsChange={setSelectedEnvironments}
        selectedSeason={selectedSeason}
        onSeasonChange={setSelectedSeason}
        resultCount={filteredCities.length}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCities.map((city, index) => (
            <div
              key={city.id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <CityCard city={city} />
            </div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl font-mono text-[rgb(var(--text-secondary))]">
              검색 결과가 없습니다.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
