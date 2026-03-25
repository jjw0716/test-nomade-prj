"use client";

import { useState } from "react";
import { cities } from "@/lib/data";
import type { FilterState } from "@/lib/data";
import { FilterBar } from "./FilterBar";
import { CityCardGrid } from "./CityCardGrid";

const initialFilters: FilterState = {
  budget: null,
  district: null,
  environment: [],
  bestSeason: [],
};

export function CitySection() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const sorted = [...cities].sort((a, b) => b.likes - a.likes);

  const filtered = sorted.filter((city) => {
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
