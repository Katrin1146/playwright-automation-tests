import { Locator, Page } from '@playwright/test';

export class CartMassivePage {
    readonly cartItems:Locator;
    
  constructor(private page: Page) {
    this.cartItems= page.locator('.card.h-100')
  }

  async openCart() {
    await this.page.click('#cartur');
  }

async getCartsCount() {
    await this.cartItems.first().waitFor();
    return await this.cartItems.count();
}

async getProductData(index:number) {
    const root = this.cartItems.nth(index)
    
    return {
        name: await root.locator('.card-title').innerText(),
        price: await root.locator('h5').innerText(),
        description: await root.locator('.card-text').innerText(),
        image: await root.locator ('.card-img-top.img-fluid'),

    }
}
}