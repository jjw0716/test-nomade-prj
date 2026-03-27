import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <span className="text-xs text-zinc-400 font-mono">{user.email}</span>
                  <form action="/auth/signout" method="POST">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 text-xs" type="submit">
                      로그아웃
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white text-xs" asChild>
                    <Link href="/login">로그인 →</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 text-xs" asChild>
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </>
              )}
            </div>
            <MobileMenu user={user} />
          </div>
        </nav>
      </div>
    </header>
  );
}
