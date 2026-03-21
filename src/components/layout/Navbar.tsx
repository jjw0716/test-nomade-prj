import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#cities", label: "도시 탐색" },
  { href: "#meetups", label: "밋업" },
  { href: "#community", label: "커뮤니티" },
  { href: "#coworking", label: "코워킹" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-lg font-bold text-violet-400 group-hover:text-violet-300 transition-colors">
              [ NomadKR ]
            </span>
            <span className="text-lg">🇰🇷</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-800/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 text-xs">
                카카오
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 text-xs">
                네이버
              </Button>
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white text-xs">
                로그인 →
              </Button>
            </div>
            <MobileMenu navLinks={navLinks} />
          </div>
        </nav>
      </div>
    </header>
  );
}
