import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — /city/[id]
 *
 * 주요 영역:
 *   - 도시 이름, 지역, 점수
 *   - 좋아요 / 싫어요 버튼
 *   - 뒤로 가기 (홈으로 이동)
 *   - 없는 ID 접근 시 → Next.js notFound() → 404 페이지
 */
export class CityDetailPage {
  readonly likeButton: Locator;
  readonly dislikeButton: Locator;
  readonly backLink: Locator;

  constructor(private readonly page: Page) {
    this.likeButton = page.getByRole('button', { name: /좋아요|ThumbsUp/ }).or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );
    this.dislikeButton = page.getByRole('button', { name: /싫어요|ThumbsDown/ }).or(
      page.locator('button').filter({ has: page.locator('svg') }).last()
    );
    this.backLink = page.getByRole('link', { name: /\[ NomadKR \]/ }).first();
  }

  async goto(cityId: number) {
    await this.page.goto(`/city/${cityId}`);
  }

  /** 도시 이름 텍스트 반환 */
  getCityName(): Locator {
    return this.page.locator('h1, [class*="text-violet"]').first();
  }

  /** 현재 URL의 city id 추출 */
  getCityIdFromUrl(): number {
    const match = this.page.url().match(/\/city\/(\d+)/);
    return match ? Number(match[1]) : -1;
  }
}
