import Link from 'next/link';
import { signup } from './actions';

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-lg font-bold text-violet-400 hover:text-violet-300 transition-colors">
            [ NomadKR ]
          </Link>
          <p className="mt-2 text-sm text-zinc-400">새 계정 만들기</p>
        </div>

        {/* Status messages */}
        <StatusMessage searchParams={searchParams} />

        {/* Form */}
        <form action={signup} className="space-y-4">
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
              autoComplete="new-password"
              minLength={6}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="6자 이상"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-md transition-colors"
          >
            회원가입 →
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

async function StatusMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;
  if (params.success) {
    return (
      <div className="mb-4 px-3 py-2 bg-green-950/50 border border-green-800 rounded-md text-green-400 text-xs font-mono">
        가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.
      </div>
    );
  }
  if (params.error) {
    return (
      <div className="mb-4 px-3 py-2 bg-red-950/50 border border-red-800 rounded-md text-red-400 text-xs font-mono">
        {params.error}
      </div>
    );
  }
  return null;
}
