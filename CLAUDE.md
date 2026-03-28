# NomadKR — CLAUDE.md

한국 디지털 노마드를 위한 도시 추천 플랫폼.

## 기술 스택

- **Framework**: Next.js 15 (App Router), React 19
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS + shadcn/ui
- **Unit Test**: Vitest + Testing Library
- **E2E Test**: Playwright

---

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 홈 (/)
│   ├── actions.ts          # 좋아요/싫어요 Server Action
│   ├── city/[id]/page.tsx  # 도시 상세 (/city/:id)
│   ├── login/              # 로그인 (/login)
│   ├── signup/             # 회원가입 (/signup)
│   └── auth/signout/       # 로그아웃 API route
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── home/               # HeroSection, CitySection, CityCard, FilterBar, Sidebar*
│   └── city/               # CityDetail
└── lib/
    ├── data.ts             # Supabase 쿼리 함수 (getCities, getCityById 등)
    ├── utils.ts            # cn(), getBlockBar()
    ├── supabase.ts         # 클라이언트 Supabase 인스턴스
    └── supabase/           # server.ts (서버 컴포넌트용)
```

---

## 라우트 보호 (middleware.ts)

| 조건 | 결과 |
|------|------|
| 비로그인 + `/dashboard` 접근 | `/login` 리다이렉트 |
| 로그인 + `/login` or `/signup` 접근 | `/` 리다이렉트 |

---

## 유닛 테스트 (Vitest)

### 설정 파일
- `vitest.config.ts` — jsdom 환경, globals, `@` 경로 별칭
- `vitest.setup.ts` — `@testing-library/jest-dom` 등록
- `tsconfig.json` — `"types": ["vitest/globals"]` 포함

### 실행
```bash
npm test          # watch 모드
npm run test:run  # 단일 실행 (CI)
```

### 테스트 파일 위치
소스 파일 옆에 co-locate (`*.test.ts` / `*.test.tsx`).

### 핵심 패턴: vi.hoisted()
`vi.mock()` 내부에서 외부 변수를 참조할 때 호이스팅 문제가 발생한다.
반드시 `vi.hoisted()`로 mock 함수를 선언할 것.

```ts
// 올바른 패턴
const { mockFn } = vi.hoisted(() => ({ mockFn: vi.fn() }));
vi.mock('@/lib/supabase', () => ({ supabase: { rpc: mockFn } }));

// 잘못된 패턴 — ReferenceError 발생
const mockFn = vi.fn();
vi.mock('@/lib/supabase', () => ({ supabase: { rpc: mockFn } })); // ❌
```

### 테스트 공유 픽스처
`src/tests/fixtures/city.ts` — `createMockCity()`, `createMockCityList()`

---

## E2E 테스트 (Playwright)

### 설정 파일
- `playwright.config.ts` (루트) — baseURL, testDir, webServer, projects
- `e2e/tsconfig.json` — root 확장, `@playwright/test` 타입만 사용

> **타입 분리 이유**: root `tsconfig.json`은 `"types": ["vitest/globals"]`를 포함하므로
> Playwright의 `test`, `expect`와 충돌한다. `e2e/`는 tsconfig를 분리하고
> root tsconfig에서 `"exclude": ["e2e"]`로 제외한다.

### 실행
```bash
npm run test:e2e          # headless 실행
npm run test:e2e:ui       # Playwright UI 모드 (대화형)
npm run test:e2e:debug    # 디버그 모드 (브라우저 열림)
```

### 폴더 구조

```
e2e/
├── tsconfig.json
├── fixtures/
│   ├── .auth/              # 런타임 세션 저장소 (.gitignore)
│   ├── auth.setup.ts       # 로그인 → storageState 저장
│   ├── auth.ts             # authenticatedPage fixture
│   └── index.ts            # test/expect 통합 export
├── pages/                  # Page Object Model (POM)
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── HomePage.ts
│   └── CityDetailPage.ts
├── helpers/
│   └── db.ts               # Supabase admin 클라이언트 / seed / cleanup
└── tests/
    ├── auth/               # 인증 흐름 테스트
    ├── home/               # 홈 페이지 / 필터 테스트
    └── city/               # 도시 상세 테스트
```

### 인증 전략: storageState

로그인이 필요한 테스트에서 매 케이스마다 로그인 절차를 반복하지 않는다.

1. `setup` 프로젝트가 `auth.setup.ts`를 **한 번만** 실행해 세션을 `e2e/fixtures/.auth/user.json`에 저장
2. 인증이 필요한 테스트는 `authenticatedPage` fixture를 사용 — 저장된 storageState로 컨텍스트 복원
3. 인증 불필요 테스트는 `@playwright/test`의 기본 `test`를 그대로 사용

```ts
// 인증 불필요
import { test, expect } from '@playwright/test';

// 인증 필요
import { test, expect } from '../../fixtures';
test('로그아웃 버튼 표시', async ({ authenticatedPage }) => { ... });
```

### Page Object Model (POM)

셀렉터와 상호작용 메서드를 페이지 클래스로 캡슐화한다.
테스트 파일에서 직접 셀렉터 문자열을 반복하지 말 것.

```ts
// e2e/tests/auth/login.spec.ts
import { LoginPage } from '../../pages/LoginPage';

test('로그인 실패 시 에러 메시지', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong@email.com', 'wrongpassword');
  await expect(loginPage.errorMessage).toBeVisible();
});
```

### 테스트 데이터 관리

실제 Supabase DB를 대상으로 실행한다.
`e2e/helpers/db.ts`의 `seedTestCities()` / `cleanupTestCities()`로 격리된 테스트 데이터를 관리한다.
테스트 전용 데이터는 이름을 `__E2E_` 접두사로 지정한다.

필요한 환경변수 (`.env.local`):
```
E2E_TEST_EMAIL=...          # auth.setup.ts 로그인용
E2E_TEST_PASSWORD=...
SUPABASE_SERVICE_ROLE_KEY=... # db.ts admin 클라이언트용
```

---

## 환경변수

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | E2E 테스트 DB admin (서버 전용) |
| `E2E_TEST_EMAIL` | E2E 테스트 로그인 계정 |
| `E2E_TEST_PASSWORD` | E2E 테스트 로그인 비밀번호 |
