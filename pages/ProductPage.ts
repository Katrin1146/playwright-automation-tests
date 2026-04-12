import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async openHomePage() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async openProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async addToCart() {
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.click('#cartur');
  }
}