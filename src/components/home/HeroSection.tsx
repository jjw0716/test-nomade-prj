import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "추천 도시", value: "11개" },
  { label: "커뮤니티 멤버", value: "2,847명" },
  { label: "월 밋업", value: "18회" },
  { label: "서비스 시작", value: "since 2025" },
];

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ASCII double-border box */}
        <div className="relative border border-violet-700/40 rounded-lg bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-8 sm:p-12 shadow-[0_0_60px_rgba(124,58,237,0.1)]">
          {/* Double border effect */}
          <div className="absolute inset-0 rounded-lg border border-violet-900/20 m-1 pointer-events-none" />

          {/* Corner characters */}
          <span className="absolute top-2 left-2 font-mono text-xs text-violet-700/60">╔</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-violet-700/60">╗</span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-violet-700/60">╚</span>
          <span className="absolute bottom-2 right-2 font-mono text-xs text-violet-700/60">╝</span>

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="font-mono text-xs text-violet-500 mb-4 tracking-widest uppercase">
              ▸ DIGITAL NOMAD PLATFORM KR
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              🇰🇷 대한민국 어디서든,{" "}
              <span className="text-violet-400">일하고 살아봐요</span>
            </h1>

            {/* Sub copy */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
              제주부터 강릉까지 한국 최고의 디지털 노마드 도시를 —{" "}
              <br className="hidden sm:block" />
              데이터로 탐색하고, 커뮤니티와 함께하세요.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-900/30"
              >
                <Link href="#cities">도시 탐색 시작하기 →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
              >
                <Link href="#meetups">밋업 보기</Link>
              </Button>
            </div>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/40 text-zinc-300"
                >
                  <span className="text-violet-400 font-bold">{stat.value}</span>
                  {" "}
                  <span className="text-zinc-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
