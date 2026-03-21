"use client";

import { useState } from "react";
import { LayoutGrid, Map } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = "score" | "cost" | "internet";
type TagFilter = "바다" | "카페많음" | "저렴";
type ViewMode = "grid" | "map";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "score", label: "노마드 점수 ▼" },
  { value: "cost", label: "저렴한 순" },
  { value: "internet", label: "인터넷 속도" },
];

const tagOptions: { value: TagFilter; label: string }[] = [
  { value: "바다", label: "🌊 바다" },
  { value: "카페많음", label: "☕ 카페많음" },
  { value: "저렴", label: "💰 저렴" },
];

export function FilterBar() {
  const [activeSort, setActiveSort] = useState<SortOption>("score");
  const [activeTags, setActiveTags] = useState<Set<TagFilter>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const toggleTag = (tag: TagFilter) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <div
      id="cities"
      className="border border-zinc-800 rounded-lg bg-zinc-900/50 px-4 py-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort label */}
        <span className="text-xs text-zinc-500 font-mono shrink-0">정렬:</span>

        {/* Sort options */}
        <div className="flex flex-wrap gap-1.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveSort(opt.value)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-all font-mono",
                activeSort === opt.value
                  ? "border-violet-500 bg-violet-900/40 text-violet-300"
                  : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:block w-px h-4 bg-zinc-700 mx-1" />

        {/* Filter label */}
        <span className="text-xs text-zinc-500 font-mono shrink-0">필터:</span>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-1.5">
          {tagOptions.map((tag) => (
            <button
              key={tag.value}
              onClick={() => toggleTag(tag.value)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md border transition-all",
                activeTags.has(tag.value)
                  ? "border-violet-500 bg-violet-900/40 text-violet-300"
                  : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
              )}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center gap-1 border border-zinc-700 rounded-md p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded transition-all",
              viewMode === "grid"
                ? "bg-zinc-700 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-400"
            )}
            aria-label="그리드 보기"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={cn(
              "p-1.5 rounded transition-all relative",
              viewMode === "map"
                ? "bg-zinc-700 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-400"
            )}
            aria-label="지도 보기"
          >
            <Map className="h-3.5 w-3.5" />
            <span className="absolute -top-1 -right-1 text-[8px] bg-zinc-700 text-zinc-400 rounded px-0.5 font-mono">v2</span>
          </button>
        </div>
      </div>
    </div>
  );
}
