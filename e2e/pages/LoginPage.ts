import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — /login
 *
 * 셀렉터:
 *   - email input: id="email" (label="EMAIL")
 *   - password input: id="password" (label="PASSWORD")
 *   - submit button: text="로그인 →"
 *   - error message: searchParams ?error= 로 전달된 에러 텍스트 (빨간 박스)
 */
export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly signupLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel('EMAIL');
    this.passwordInput = page.getByLabel('PASSWORD');
    this.submitButton = page.getByRole('button', { name: '로그인 →' });
    // 에러 메시지 박스: bg-red-950/50 border-red-800
    this.errorMessage = page.locator('.text-red-400.font-mono');
    this.signupLink = page.getByRole('link', { name: '회원가입' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
