import { Page } from '@playwright/test';

export class ContactPage {
  constructor(private page: Page) {}

  async openHomePage() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async openContactModal() {
    await this.page.getByRole('link', { name: 'Contact' }).click();
  }

  async fillContactForm(email: string, name: string, message: string) {
    await this.page.fill('#recipient-email', email);
    await this.page.fill('#recipient-name', name);
    await this.page.fill('#message-text', message);
  }

  async sendMessage() {
    await this.page.click('button[onclick="send()"]');
  }

  async closeWithCloseButton() {
    await this.page.locator('#exampleModal .btn-secondary').click();
  }

  async closeWithXButton() {
    await this.page.locator('#exampleModal .close').click();
  }
}
