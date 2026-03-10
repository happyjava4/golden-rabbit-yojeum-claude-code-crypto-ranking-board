"use client";

import { Region, SortOption } from "@/types/city";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, List } from "lucide-react";

interface FilterBarProps {
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  resultCount: number;
}

const regions: Region[] = ["전체", "제주", "강원", "경상", "전라", "서울"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "nomadScore", label: "노마드 점수순" },
  { value: "costLow", label: "생활비 저렴순" },
  { value: "internetFast", label: "인터넷 빠른순" },
  { value: "cafeRich", label: "카페 풍부순" },
  { value: "reviewsMany", label: "리뷰 많은순" },
];

export function FilterBar({
  selectedRegion,
  onRegionChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* 지역 필터 */}
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => onRegionChange(region)}
                className={
                  selectedRegion === region
                    ? "bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))]"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text))] hover:bg-[rgb(var(--panel))] hover:text-[rgb(var(--green))]"
                }
              >
                {region}
              </Button>
            ))}
          </div>

          {/* 정렬 & 뷰 모드 */}
          <div className="flex items-center gap-3">
            {/* 결과 카운트 */}
            <span className="text-sm text-[rgb(var(--dim))]">
              {resultCount}개 도시 표시 중
            </span>

            {/* 정렬 */}
            <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-[160px] border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[rgb(var(--border))] bg-[rgb(var(--panel))]">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[rgb(var(--text))] focus:bg-[rgb(var(--bg))] focus:text-[rgb(var(--green))]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 뷰 모드 토글 */}
            <div className="hidden sm:flex gap-1 rounded border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))]"
                    : "text-[rgb(var(--dim))] hover:text-[rgb(var(--text))]"
                }
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange("list")}
                className={
                  viewMode === "list"
                    ? "bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))]"
                    : "text-[rgb(var(--dim))] hover:text-[rgb(var(--text))]"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
