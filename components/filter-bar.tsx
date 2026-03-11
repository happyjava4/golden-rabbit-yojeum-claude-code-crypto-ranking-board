"use client";

import { Budget, Region, Environment, BestSeason } from "@/types/city";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  selectedBudget: Budget | null;
  onBudgetChange: (budget: Budget | null) => void;
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
  selectedEnvironments: Environment[];
  onEnvironmentsChange: (environments: Environment[]) => void;
  selectedSeason: BestSeason | null;
  onSeasonChange: (season: BestSeason | null) => void;
  resultCount: number;
}

const budgets: Budget[] = ["100만원 이하", "100-200만원", "200만원 이상"];
const regions: Region[] = ["전체", "수도권", "경상도", "전라도", "강원도", "제주도", "충청도"];
const environments: Environment[] = ["자연친화", "도심선호", "카페작업", "코워킹 필수"];
const seasons: BestSeason[] = ["봄", "여름", "가을", "겨울"];

export function FilterBar({
  selectedBudget,
  onBudgetChange,
  selectedRegion,
  onRegionChange,
  selectedEnvironments,
  onEnvironmentsChange,
  selectedSeason,
  onSeasonChange,
  resultCount,
}: FilterBarProps) {
  const handleEnvironmentToggle = (env: Environment) => {
    if (selectedEnvironments.includes(env)) {
      onEnvironmentsChange(selectedEnvironments.filter((e) => e !== env));
    } else {
      onEnvironmentsChange([...selectedEnvironments, env]);
    }
  };

  return (
    <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* 예산 필터 */}
          <div>
            <h3 className="mb-2 text-sm font-mono text-[rgb(var(--text-secondary))]">
              💰 예산
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBudget === null ? "default" : "outline"}
                size="sm"
                onClick={() => onBudgetChange(null)}
                className={`flex-1 ${
                  selectedBudget === null
                    ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                }`}
              >
                전체
              </Button>
              {budgets.map((budget) => (
                <Button
                  key={budget}
                  variant={selectedBudget === budget ? "default" : "outline"}
                  size="sm"
                  onClick={() => onBudgetChange(budget)}
                  className={`flex-1 ${
                    selectedBudget === budget
                      ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                      : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                  }`}
                >
                  {budget}
                </Button>
              ))}
            </div>
          </div>

          {/* 지역 필터 */}
          <div>
            <h3 className="mb-2 text-sm font-mono text-[rgb(var(--text-secondary))]">
              📍 지역
            </h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRegionChange(region)}
                  className={`flex-1 ${
                    selectedRegion === region
                      ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                      : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                  }`}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          {/* 환경 필터 (다중 선택) */}
          <div>
            <h3 className="mb-2 text-sm font-mono text-[rgb(var(--text-secondary))]">
              🌿 환경 (복수 선택 가능)
            </h3>
            <div className="flex flex-wrap gap-2">
              {environments.map((env) => (
                <Button
                  key={env}
                  variant={selectedEnvironments.includes(env) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleEnvironmentToggle(env)}
                  className={`flex-1 ${
                    selectedEnvironments.includes(env)
                      ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                      : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                  }`}
                >
                  {env}
                </Button>
              ))}
            </div>
          </div>

          {/* 최고 계절 필터 */}
          <div>
            <h3 className="mb-2 text-sm font-mono text-[rgb(var(--text-secondary))]">
              🌸 최고 계절
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSeason === null ? "default" : "outline"}
                size="sm"
                onClick={() => onSeasonChange(null)}
                className={`flex-1 ${
                  selectedSeason === null
                    ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                }`}
              >
                전체
              </Button>
              {seasons.map((season) => (
                <Button
                  key={season}
                  variant={selectedSeason === season ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSeasonChange(season)}
                  className={`flex-1 ${
                    selectedSeason === season
                      ? "bg-[rgb(var(--accent))] text-black hover:bg-[rgb(var(--accent))]/90"
                      : "border-[rgb(var(--border))] text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--accent))]/20"
                  }`}
                >
                  {season}
                </Button>
              ))}
            </div>
          </div>

          {/* 결과 카운트 */}
          <div className="text-sm font-mono text-[rgb(var(--text-secondary))]">
            {resultCount}개의 도시가 검색되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
