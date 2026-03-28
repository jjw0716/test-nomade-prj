import { Plane } from "lucide-react";
import { getNomadStatus } from "@/lib/data";

export async function SidebarNomads() {
  const nomadStatus = await getNomadStatus();
  const maxCount = Math.max(...nomadStatus.map((n) => n.count));

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
        <Plane className="h-4 w-4 text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-200">지금 이동 중</h3>
        <div className="ml-auto flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-600">실시간</span>
        </div>
      </div>

      {/* Nomad status list */}
      <div className="px-4 py-3 space-y-2.5">
        {nomadStatus.map((item) => {
          const ratio = (item.count / maxCount) * 100;
          return (
            <div key={item.city}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-zinc-600">▸</span>
                  <span className="text-xs font-medium text-zinc-300">{item.city}</span>
                  <span className="text-[10px] text-zinc-600">노마드</span>
                </div>
                <span className="font-mono text-xs text-violet-400 font-bold">{item.count}명</span>
              </div>
              {/* Tiny progress bar */}
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all"
                  style={{ width: `${ratio}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
