"use client";

import { useState } from "react";
import type { City, FilterState } from "@/lib/data";
import { FilterBar } from "./FilterBar";
import { CityCardGrid } from "./CityCardGrid";

interface CitySectionProps {
  cities: City[];
}

const initialFilters: FilterState = {
  budget: null,
  district: null,
  environment: [],
  bestSeason: [],
};

export function CitySection({ cities }: CitySectionProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filtered = cities.filter((city) => {
    if (filters.budget !== null && city.budget !== filters.budget) return false;
    if (filters.district !== null && city.district !== filters.district) return false;
    if (filters.environment.length > 0 && !filters.environment.every((e) => city.environment.includes(e))) return false;
    if (filters.bestSeason.length > 0 && !filters.bestSeason.every((s) => city.bestSeason.includes(s))) return false;
    return true;
  });

  return (
    <>
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="mt-6">
        <CityCardGrid cities={filtered} />
      </div>
    </>
  );
}
