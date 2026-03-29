import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('홈페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('로고가 Navbar에 존재한다', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.navbarLogo).toBeVisible();
    await expect(homePage.navbarLogo).toContainText('[ NomadKR ]');
  });

  test('도시 카드들이 존재한다', async ({ page }) => {
    const homePage = new HomePage(page);
    const count = await homePage.cityCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('처음 접속 시 필터가 적용되지 않은 상태이다', async ({ page }) => {
    // 예산 필터: 아무것도 활성화되지 않아야 함
    for (const label of ['100만원이하', '100~200만원', '200만원이상']) {
      await expect(page.getByRole('button', { name: label })).not.toHaveClass(/border-violet-500/);
    }

    // 지역 필터: "전체" 버튼이 활성화(=필터 없음 상태), 나머지는 비활성화
    await expect(page.getByRole('button', { name: '전체' })).toHaveClass(/border-violet-500/);
    for (const label of ['수도권', '경상도', '전라도', '강원도', '제주도', '충청도']) {
      await expect(page.getByRole('button', { name: label })).not.toHaveClass(/border-violet-500/);
    }

    // 환경 필터: 아무것도 활성화되지 않아야 함
    for (const label of ['자연친화', '도심선호', '카페작업', '코워킹 필수']) {
      await expect(page.getByRole('button', { name: label })).not.toHaveClass(/border-violet-500/);
    }

    // 계절 필터: 아무것도 활성화되지 않아야 함
    for (const label of ['봄', '여름', '가을', '겨울']) {
      await expect(page.getByRole('button', { name: label })).not.toHaveClass(/border-violet-500/);
    }
  });

  test('필터 미적용 시 DB에 저장된 모든 도시가 카드로 나열된다', async ({ page }) => {
    const homePage = new HomePage(page);

    // 도시 리스트 헤딩에서 전체 도시 수 추출 (예: "▸ 도시 리스트 (11개)")
    const heading = page.locator('h2').filter({ hasText: '도시 리스트' });
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    const match = headingText?.match(/\((\d+)개\)/);
    expect(match).not.toBeNull();

    const expectedCount = Number(match![1]);
    expect(expectedCount).toBeGreaterThan(0);

    // 실제 렌더링된 도시 카드 수 = 헤딩의 수
    await expect(homePage.cityCards).toHaveCount(expectedCount);
  });
});
