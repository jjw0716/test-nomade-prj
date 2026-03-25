"use client";

import { cn } from "@/lib/utils";
import type { Budget, District, Environment, Season, FilterState } from "@/lib/data";

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const budgetOptions: Budget[] = ["100만원이하", "100~200만원", "200만원이상"];
const districtOptions: District[] = ["수도권", "경상도", "전라도", "강원도", "제주도", "충청도"];
const environmentOptions: Environment[] = ["자연친화", "도심선호", "카페작업", "코워킹 필수"];
const seasonOptions: Season[] = ["봄", "여름", "가을", "겨울"];

const activeClass = "border-violet-500 bg-violet-900/40 text-violet-300";
const inactiveClass = "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400";
const btnBase = "px-3 py-1.5 text-xs rounded-md border transition-all font-mono";

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-zinc-500 font-mono shrink-0 w-16">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const toggleBudget = (value: Budget) => {
    onChange({ ...filters, budget: filters.budget === value ? null : value });
  };

  const toggleDistrict = (value: District | null) => {
    onChange({ ...filters, district: value });
  };

  const toggleEnvironment = (value: Environment) => {
    const next = filters.environment.includes(value)
      ? filters.environment.filter((e) => e !== value)
      : [...filters.environment, value];
    onChange({ ...filters, environment: next });
  };

  const toggleSeason = (value: Season) => {
    const next = filters.bestSeason.includes(value)
      ? filters.bestSeason.filter((s) => s !== value)
      : [...filters.bestSeason, value];
    onChange({ ...filters, bestSeason: next });
  };

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/50 px-4 py-3 space-y-2.5">
      <FilterGroup label="예산">
        {budgetOptions.map((value) => (
          <button
            key={value}
            onClick={() => toggleBudget(value)}
            className={cn(btnBase, filters.budget === value ? activeClass : inactiveClass)}
          >
            {value}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup label="지역">
        <button
          onClick={() => toggleDistrict(null)}
          className={cn(btnBase, filters.district === null ? activeClass : inactiveClass)}
        >
          전체
        </button>
        {districtOptions.map((value) => (
          <button
            key={value}
            onClick={() => toggleDistrict(value)}
            className={cn(btnBase, filters.district === value ? activeClass : inactiveClass)}
          >
            {value}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup label="환경">
        {environmentOptions.map((value) => (
          <button
            key={value}
            onClick={() => toggleEnvironment(value)}
            className={cn(btnBase, filters.environment.includes(value) ? activeClass : inactiveClass)}
          >
            {value}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup label="최고 계절">
        {seasonOptions.map((value) => (
          <button
            key={value}
            onClick={() => toggleSeason(value)}
            className={cn(btnBase, filters.bestSeason.includes(value) ? activeClass : inactiveClass)}
          >
            {value}
          </button>
        ))}
      </FilterGroup>
    </div>
  );
}
