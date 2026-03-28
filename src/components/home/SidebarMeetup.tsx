import Link from "next/link";
import { Calendar } from "lucide-react";
import { getMeetups } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export async function SidebarMeetup() {
  const meetups = await getMeetups();

  return (
    <div
      id="meetups"
      className="border border-zinc-800 rounded-lg bg-zinc-900/60 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-200">다음 밋업</h3>
        <span className="ml-auto font-mono text-[10px] text-zinc-600">🥥</span>
      </div>

      {/* Meetup list */}
      <div className="divide-y divide-zinc-800/50">
        {meetups.map((meetup) => (
          <div key={meetup.id} className="px-4 py-3 hover:bg-zinc-800/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-200">{meetup.city}</span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {meetup.date} ({meetup.dayOfWeek})
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <span className="text-violet-400">{meetup.rsvp}</span>
                <span className="text-zinc-600">명</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-zinc-800/50" />

      {/* Footer link */}
      <div className="px-4 py-2.5">
        <Link
          href="#"
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-mono"
        >
          전체 밋업 보기 →
        </Link>
      </div>
    </div>
  );
}
