"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

interface MobileMenuProps {
  user: User | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
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
          <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-2">
            {user ? (
              <>
                <p className="text-xs text-zinc-500 font-mono px-1">{user.email}</p>
                <form action="/auth/signout" method="POST">
                  <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300" type="submit">
                    로그아웃
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-500" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>로그인 →</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300" asChild>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>회원가입</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
