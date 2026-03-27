import Link from 'next/link';
import { login } from './actions';

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-lg font-bold text-violet-400 hover:text-violet-300 transition-colors">
            [ NomadKR ]
          </Link>
          <p className="mt-2 text-sm text-zinc-400">이메일로 로그인</p>
        </div>

        {/* Error */}
        <ErrorMessage searchParams={searchParams} />

        {/* Form */}
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-zinc-400 mb-1 font-mono">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-zinc-400 mb-1 font-mono">
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-md transition-colors"
          >
            로그인 →
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-500">
          계정이 없으신가요?{' '}
          <Link href="/signup" className="text-violet-400 hover:text-violet-300 transition-colors">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return (
    <div className="mb-4 px-3 py-2 bg-red-950/50 border border-red-800 rounded-md text-red-400 text-xs font-mono">
      {params.error}
    </div>
  );
}
