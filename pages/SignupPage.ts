import { Page } from '@playwright/test';

export class SignUpPage {
  constructor(private page: Page) {}

  async openHomePage() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async openSignUpModal() {
    await this.page.click('#signin2');
  }

  async signUp(username: string, password: string) {
    await this.page.fill('#sign-username', username);
    await this.page.fill('#sign-password', password);
    await this.page.click('button[onclick="register()"]');
  }
}