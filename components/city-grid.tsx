"use client";

import { useState, useMemo } from "react";
import { City, Region, SortOption } from "@/types/city";
import { FilterBar } from "./filter-bar";
import { CityCard } from "./city-card";
import { CityModal } from "./city-modal";

interface CityGridProps {
  cities: City[];
}

export function CityGrid({ cities }: CityGridProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("nomadScore");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 필터링 및 정렬 로직
  const filteredAndSortedCities = useMemo(() => {
    let result = [...cities];

    // 지역 필터
    if (selectedRegion !== "전체") {
      result = result.filter((city) => city.region === selectedRegion);
    }

    // 정렬
    switch (sortOption) {
      case "nomadScore":
        result.sort((a, b) => b.nomadScore - a.nomadScore);
        break;
      case "costLow":
        result.sort((a, b) => b.cost - a.cost); // cost가 높을수록 저렴함
        break;
      case "internetFast":
        result.sort((a, b) => b.internet - a.internet);
        break;
      case "cafeRich":
        result.sort((a, b) => b.cafe - a.cafe);
        break;
      case "reviewsMany":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [cities, selectedRegion, sortOption]);

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCity(null), 300);
  };

  return (
    <>
      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        sortOption={sortOption}
        onSortChange={setSortOption}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredAndSortedCities.length}
      />

      <section className="container mx-auto px-4 py-8">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedCities.map((city, index) => (
            <div
              key={city.id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <CityCard city={city} onClick={() => handleCityClick(city)} />
            </div>
          ))}
        </div>

        {filteredAndSortedCities.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-[rgb(var(--dim))]">
              해당 지역에 도시가 없습니다.
            </p>
          </div>
        )}
      </section>

      <CityModal city={selectedCity} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
