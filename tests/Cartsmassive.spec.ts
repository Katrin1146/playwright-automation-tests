import { test, expect } from '@playwright/test';
import { log } from 'console';
import { CartMassivePage } from '../pages/CartMassive';
import { ProductPage } from '../pages/ProductPage';


test('verify product names and prices in catalog', async ({ page }) => {
 
    const CartMassive = new CartMassivePage(page);
    const productPage = new ProductPage(page);
    await productPage.openHomePage();



    const countCarts = await CartMassive.getCartsCount()

  for (let i=0; i < countCarts; i++) {
    const product = await CartMassive.getProductData(i)
    

  console.log (`Товар №${i + 1}: ${product.name} | Цена: ${product.price}`);

  expect (product.name.length).toBeGreaterThan(0);
  expect (product.price).toContain('$');
  expect (product.description).not.toBe ('');
  await expect (product.image).toBeVisible();

  }
})

