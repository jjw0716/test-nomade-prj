import type { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — /signup
 *
 * 셀렉터:
 *   - email input: id="email" (label="EMAIL")
 *   - password input: id="password" (label="PASSWORD", minLength=6)
 *   - submit button: text="회원가입 →"
 *   - success message: searchParams ?success=true → 초록 박스
 *   - error message: searchParams ?error= → 빨간 박스
 */
export class SignupPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly loginLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel('EMAIL');
    this.passwordInput = page.getByLabel('PASSWORD');
    this.submitButton = page.getByRole('button', { name: '회원가입 →' });
    this.successMessage = page.locator('.text-green-400.font-mono');
    this.errorMessage = page.locator('.text-red-400.font-mono');
    this.loginLink = page.getByRole('link', { name: '로그인' });
  }

  async goto() {
    await this.page.goto('/signup');
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

  async signup(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
