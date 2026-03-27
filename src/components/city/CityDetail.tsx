"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { City } from "@/lib/data";

interface CityDetailProps {
  city: City;
}

export function CityDetail({ city }: CityDetailProps) {
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => setVote((prev) => (prev === "like" ? null : "like"));
  const handleDislike = () =>
    setVote((prev) => (prev === "dislike" ? null : "dislike"));

  const likeCount = city.likes + (vote === "like" ? 1 : 0);
  const dislikeCount = city.dislikes + (vote === "dislike" ? 1 : 0);

  const tierColor = {
    T1: "text-violet-400 border-violet-700/50 bg-violet-950/30",
    T2: "text-blue-400 border-blue-700/50 bg-blue-950/30",
    T3: "text-zinc-400 border-zinc-700/50 bg-zinc-800/30",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6 font-mono"
      >
        <ArrowLeft className="h-4 w-4" />
        홈으로 돌아가기
      </Link>

      {/* Card */}
      <div
        className={cn(
          "border rounded-lg bg-zinc-900/60",
          city.featured
            ? "border-violet-600/50 shadow-[inset_3px_0_0_0_rgba(124,58,237,0.8)]"
            : "border-zinc-800"
        )}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-zinc-800/50">
          <div className="font-mono text-sm text-zinc-600 flex items-center gap-1 mb-1">
            <span>┌─[</span>
            <span
              className={cn(
                "font-semibold text-base",
                city.featured ? "text-violet-300" : "text-zinc-200"
              )}
            >
              #{city.rank} {city.name}
            </span>
            <span>]</span>
            {city.featured && (
              <span className="ml-auto text-xs text-violet-500 font-mono">
                ✦ TOP
              </span>
            )}
          </div>
          <div className="font-mono text-xs text-zinc-500 flex items-center justify-between">
            <span>│ {city.region}</span>
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded border font-mono",
                tierColor[city.tier]
              )}
            >
              {city.tier}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-2 font-mono text-sm">
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">예산</span>
            <span className="text-zinc-300">{city.budget}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">지역</span>
            <span className="text-zinc-300">{city.district}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">환경</span>
            <span className="text-zinc-300">{city.environment.join(", ")}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">최고 계절</span>
            <span className="text-zinc-300">{city.bestSeason.join(", ")}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">월 비용</span>
            <span className="text-zinc-300">{city.monthlyCost}만원</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">인터넷</span>
            <span className="text-zinc-300">{city.internetSpeed} Mbps</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 w-20 shrink-0">태그</span>
            <span className="text-zinc-300">{city.tags.join(" ")}</span>
          </div>
          <div className="font-mono text-xs text-zinc-800 pt-1">
            └{"─".repeat(24)}
          </div>
        </div>

        {/* Like / Dislike */}
        <div className="border-t border-zinc-800/50 px-5 py-3 flex items-center gap-4">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              vote === "like"
                ? "text-green-400"
                : "text-zinc-500 hover:text-green-400"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="font-mono">{likeCount}</span>
          </button>
          <button
            onClick={handleDislike}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              vote === "dislike"
                ? "text-red-400"
                : "text-zinc-500 hover:text-red-400"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="font-mono">{dislikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
