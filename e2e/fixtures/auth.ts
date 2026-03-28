import { test as base } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '.auth/user.json');

type AuthFixtures = {
  /** 로그인된 상태의 Page — storageState로 세션 복원 */
  authenticatedPage: ReturnType<typeof base['extend']> extends never ? never : Awaited<Parameters<Parameters<typeof base.extend>[0][string]>[0]>['page'];
};

/**
 * 인증 Fixture
 *
 * 사용법:
 *   import { test } from '@/e2e/fixtures';
 *   test('인증이 필요한 테스트', async ({ authenticatedPage }) => { ... });
 *
 * 저장된 storageState를 사용하므로 각 테스트에서 로그인 절차를 반복하지 않음.
 */
export const test = base.extend({
  // 인증된 페이지 컨텍스트: 저장된 세션 파일로 초기화
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_FILE,
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
