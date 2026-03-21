"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-zinc-400 hover:text-zinc-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="메뉴 열기"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 z-40">
          <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-800 mt-2 pt-3 flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300">
                카카오 로그인
              </Button>
              <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300">
                네이버 로그인
              </Button>
              <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-500">
                구글 로그인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
