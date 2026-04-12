import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('should place order successfully', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await productPage.openHomePage();
  await productPage.openProduct('Samsung galaxy s6');

  const dialogPromise = page.waitForEvent('dialog');
  await productPage.addToCart();

  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('Product added');
  await dialog.accept();

  await cartPage.openCart();

  await expect(page.locator('.success')).toContainText('Samsung galaxy s6');

  await cartPage.clickPlaceOrder();

  await cartPage.fillOrderForm(
    'Kate',
    'Ukraine',
    'Odesa',
    '1234123412341234',
    '10',
    '2026'
  );

  await cartPage.clickPurchase();

  await expect(page.locator('.sweet-alert')).toBeVisible();
  await expect(page.locator('.sweet-alert h2')).toHaveText('Thank you for your purchase!');

  await page.getByRole('button', { name: 'OK' }).click();
});