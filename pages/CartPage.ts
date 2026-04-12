import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.click('#cartur');
  }

  async clickPlaceOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  async fillOrderForm(
    name: string,
    country: string,
    city: string,
    card: string,
    month: string,
    year: string
  ) {
    await this.page.fill('#name', name);
    await this.page.fill('#country', country);
    await this.page.fill('#city', city);
    await this.page.fill('#card', card);
    await this.page.fill('#month', month);
    await this.page.fill('#year', year);
  }

  async clickPurchase() {
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }
}
