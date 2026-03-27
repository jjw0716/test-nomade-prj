"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { City } from "@/lib/data";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => setVote((prev) => (prev === "like" ? null : "like"));
  const handleDislike = () => setVote((prev) => (prev === "dislike" ? null : "dislike"));

  const likeCount = city.likes + (vote === "like" ? 1 : 0);
  const dislikeCount = city.dislikes + (vote === "dislike" ? 1 : 0);

  const tierColor = {
    T1: "text-violet-400 border-violet-700/50 bg-violet-950/30",
    T2: "text-blue-400 border-blue-700/50 bg-blue-950/30",
    T3: "text-zinc-400 border-zinc-700/50 bg-zinc-800/30",
  };

  return (
    <Link
      href={`/city/${city.id}`}
      className={cn(
        "relative border rounded-lg bg-zinc-900/60 transition-all duration-200 block",
        "hover:border-violet-600/60 hover:bg-zinc-900/80 hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]",
        city.featured
          ? "border-violet-600/50 shadow-[inset_3px_0_0_0_rgba(124,58,237,0.8)]"
          : "border-zinc-800"
      )}
    >
      {/* Card header */}
      <div className="px-3 pt-3 pb-2 border-b border-zinc-800/50">
        <div className="font-mono text-xs text-zinc-600 flex items-center gap-1 mb-0.5">
          <span>┌─[</span>
          <span className={cn("font-semibold", city.featured ? "text-violet-300" : "text-zinc-200")}>
            #{city.rank} {city.name}
          </span>
          <span>]</span>
          {city.featured && (
            <span className="ml-auto text-[10px] text-violet-500 font-mono">✦ TOP</span>
          )}
        </div>
        <div className="font-mono text-[10px] text-zinc-600 flex items-center justify-between">
          <span className="text-zinc-500">│ {city.region}</span>
          <span className={cn("text-[9px] px-1.5 py-0.5 rounded border font-mono", tierColor[city.tier])}>
            {city.tier}
          </span>
        </div>
      </div>

      {/* Card body — filter Key-Value */}
      <div className="p-3 space-y-1.5 font-mono text-xs">
        <div className="flex gap-2">
          <span className="text-zinc-600 w-16 shrink-0">예산</span>
          <span className="text-zinc-300">{city.budget}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-600 w-16 shrink-0">지역</span>
          <span className="text-zinc-300">{city.district}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-600 w-16 shrink-0">환경</span>
          <span className="text-zinc-300">{city.environment.join(", ")}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-600 w-16 shrink-0">최고 계절</span>
          <span className="text-zinc-300">{city.bestSeason.join(", ")}</span>
        </div>
        <div className="font-mono text-[10px] text-zinc-800 pt-1">
          └{"─".repeat(20)}
        </div>
      </div>

      {/* Like / Dislike */}
      <div className="border-t border-zinc-800/50 px-3 py-2 flex items-center justify-between">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(); }}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            vote === "like" ? "text-green-400" : "text-zinc-500 hover:text-green-400"
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span className="font-mono">{likeCount}</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDislike(); }}
          className={cn(
            "flex items-center gap-1.5 text-xs transition-colors",
            vote === "dislike" ? "text-red-400" : "text-zinc-500 hover:text-red-400"
          )}
        >
          <span className="font-mono">{dislikeCount}</span>
          <ThumbsDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </Link>
  );
}
