import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — / (홈)
 *
 * 주요 영역:
 *   - Navbar: 로고, 로그인/회원가입/로그아웃 버튼
 *   - FilterBar: 예산·지역·환경·계절 필터 버튼
 *   - CityCardGrid: 도시 카드 목록 (각 카드는 /city/:id 링크)
 *   - Sidebar: 밋업·멤버·노마드 현황 위젯
 */
export class HomePage {
  // Navbar
  readonly navbarLogo: Locator;
  readonly loginButton: Locator;
  readonly signupButton: Locator;
  readonly logoutButton: Locator;
  readonly userEmail: Locator;

  // FilterBar
  readonly filterBar: Locator;
  readonly budgetButtons: Locator;
  readonly districtButtons: Locator;
  readonly environmentButtons: Locator;
  readonly seasonButtons: Locator;

  // City cards
  readonly cityCards: Locator;

  constructor(private readonly page: Page) {
    // Navbar
    this.navbarLogo = page.getByRole('link', { name: /\[ NomadKR \]/ }).first();
    this.loginButton = page.getByRole('link', { name: '로그인 →' });
    this.signupButton = page.getByRole('link', { name: '회원가입' });
    this.logoutButton = page.getByRole('button', { name: '로그아웃' });
    this.userEmail = page.locator('span.font-mono.text-zinc-400').first();

    // FilterBar — 필터 그룹별 버튼
    this.filterBar = page.locator('.border.border-zinc-800.rounded-lg');
    this.budgetButtons = page.getByRole('button', { name: /만원/ });
    this.districtButtons = page.getByRole('button', { name: /수도권|경상도|전라도|강원도|제주도|충청도|전체/ });
    this.environmentButtons = page.getByRole('button', { name: /자연친화|도심선호|카페작업|코워킹 필수/ });
    this.seasonButtons = page.getByRole('button', { name: /봄|여름|가을|겨울/ });

    // City cards: /city/:id 로 연결되는 링크
    this.cityCards = page.locator('a[href^="/city/"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async filterByBudget(label: string) {
    await this.page.getByRole('button', { name: label }).click();
  }

  async filterByDistrict(label: string) {
    await this.page.getByRole('button', { name: label }).click();
  }

  async filterByEnvironment(label: string) {
    await this.page.getByRole('button', { name: label }).click();
  }

  async filterBySeason(label: string) {
    await this.page.getByRole('button', { name: label }).click();
  }

  async clickCityCard(index: number) {
    await this.cityCards.nth(index).click();
  }
}
