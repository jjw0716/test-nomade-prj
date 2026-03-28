import { test as setup, expect } from '@playwright/test';
import path from 'path';

// 인증 세션 저장 경로 — playwright.config.ts의 storageState와 일치해야 함
export const AUTH_FILE = path.join(__dirname, '.auth/user.json');

/**
 * 인증 Setup 테스트
 * - 실제 로그인 절차를 수행하고 세션 상태를 디스크에 저장
 * - playwright.config.ts의 'setup' 프로젝트에서 단 한 번만 실행됨
 * - 이후 테스트들은 저장된 storageState를 재사용하므로 매번 로그인 불필요
 */
setup('로그인 후 세션 저장', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('EMAIL').fill(process.env.E2E_TEST_EMAIL!);
  await page.getByLabel('PASSWORD').fill(process.env.E2E_TEST_PASSWORD!);
  await page.getByRole('button', { name: '로그인 →' }).click();

  // 로그인 성공 후 홈으로 리다이렉트될 때까지 대기
  await expect(page).toHaveURL('/');

  // 세션 저장
  await page.context().storageState({ path: AUTH_FILE });
});
