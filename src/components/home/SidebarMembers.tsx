import { Users } from "lucide-react";
import { getMembers } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export async function SidebarMembers() {
  const members = await getMembers();

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
        <Users className="h-4 w-4 text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-200">최근 가입 멤버</h3>
        <span className="ml-auto font-mono text-[10px] text-zinc-600">👋</span>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {members.map((member) => (
            <Avatar key={member.id} className="h-8 w-8">
              <AvatarFallback className={cn("text-xs font-bold text-white", member.color)}>
                {member.initial}
              </AvatarFallback>
            </Avatar>
          ))}
          <div className="h-8 w-8 rounded-full border border-dashed border-zinc-700 flex items-center justify-center">
            <span className="text-[10px] text-zinc-600">+더보기</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 font-mono">
          이번 달{" "}
          <span className="text-violet-400 font-bold">+134명</span>{" "}
          가입
        </p>
      </div>
    </div>
  );
}
