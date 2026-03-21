import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, getBlockBar } from "@/lib/utils";
import type { City } from "@/lib/data";

interface CityCardProps {
  city: City;
}

function BlockBar({ value, max, length = 5 }: { value: number; max: number; length?: number }) {
  const { filled, empty } = getBlockBar(value, max, length);
  return (
    <span className="font-mono text-xs tracking-tight">
      <span className="text-violet-400">{"█".repeat(filled)}</span>
      <span className="text-zinc-700">{"░".repeat(empty)}</span>
    </span>
  );
}

function Stars({ score }: { score: number }) {
  const full = Math.floor(score);
  const hasHalf = score % 1 >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="font-mono text-sm">
      <span className="text-yellow-400">{"★".repeat(full)}</span>
      {hasHalf && <span className="text-yellow-600">☆</span>}
      <span className="text-zinc-700">{"☆".repeat(empty)}</span>
    </span>
  );
}

export function CityCard({ city }: CityCardProps) {
  const tierColor = {
    T1: "text-violet-400 border-violet-700/50 bg-violet-950/30",
    T2: "text-blue-400 border-blue-700/50 bg-blue-950/30",
    T3: "text-zinc-400 border-zinc-700/50 bg-zinc-800/30",
  };

  return (
    <Link href={`#city-${city.id}`} className="block group">
      <div
        className={cn(
          "relative border rounded-lg bg-zinc-900/60 transition-all duration-200",
          "hover:border-violet-600/60 hover:bg-zinc-900/80 hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]",
          city.featured
            ? "border-violet-600/50 shadow-[inset_3px_0_0_0_rgba(124,58,237,0.8)]"
            : "border-zinc-800"
        )}
      >
        {/* Card header (ASCII style) */}
        <div className="px-3 pt-3 pb-2 border-b border-zinc-800/50">
          <div className="font-mono text-xs text-zinc-600 flex items-center gap-1 mb-0.5">
            <span>┌─[</span>
            <span className={cn(
              "font-semibold",
              city.featured ? "text-violet-300" : "text-zinc-200 group-hover:text-violet-300 transition-colors"
            )}>
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

        {/* Card body */}
        <div className="p-3 space-y-3">
          {/* Score */}
          <div className="flex items-center gap-2">
            <Stars score={city.score} />
            <span className="text-sm font-bold text-zinc-200 font-mono">{city.score}</span>
          </div>

          {/* Bar charts */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 w-4">💰</span>
              <BlockBar value={city.monthlyCost} max={300} length={5} />
              <span className="text-zinc-300 ml-auto">{city.monthlyCost}<span className="text-zinc-600">만원</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 w-4">📡</span>
              <BlockBar value={city.internetSpeed} max={700} length={5} />
              <span className="text-zinc-300 ml-auto">{city.internetSpeed}<span className="text-zinc-600">Mbps</span></span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {city.tags.map((tag) => (
              <Badge key={tag} variant="tag" className="text-[10px] py-0 px-1.5">
                {tag}
              </Badge>
            ))}
          </div>

          {/* ASCII footer line */}
          <div className="font-mono text-[10px] text-zinc-800">
            └{"─".repeat(20)}
          </div>
        </div>

        {/* Like / Dislike */}
        <div className="border-t border-zinc-800/50 px-3 py-2 flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-green-400 transition-colors group/like">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span className="font-mono">{city.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors group/dislike">
            <ThumbsDown className="h-3.5 w-3.5" />
            <span className="font-mono">{city.dislikes}</span>
          </button>
          {city.coworkingCount && (
            <span className="ml-auto text-[10px] text-zinc-600 font-mono">
              🏢 코워킹 {city.coworkingCount}곳
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
