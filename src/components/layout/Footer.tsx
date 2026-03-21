import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#cities", label: "도시 탐색" },
  { href: "#meetups", label: "밋업" },
  { href: "#community", label: "커뮤니티" },
  { href: "#coworking", label: "코워킹" },
  { href: "#contact", label: "문의하기" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-base font-bold text-violet-400">[ NomadKR ] 🇰🇷</div>
            <p className="text-sm text-zinc-500 mt-1">대한민국 디지털 노마드 커뮤니티</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        {/* Bottom */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <span>© 2025 NomadKR. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-zinc-400 transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
