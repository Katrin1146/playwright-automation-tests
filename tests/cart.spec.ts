import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('should add product to cart', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.openHomePage();
  await productPage.openProduct('Samsung galaxy s6');

  const dialogPromise = page.waitForEvent('dialog');

  await productPage.addToCart();

  const dialog = await dialogPromise;
  await expect(dialog.message()).toContain('Product added');
  await dialog.accept();

  await productPage.openCart();
  await expect(page.locator('.success')).toContainText('Samsung galaxy s6');
});

test('should add multiple products to cart and show correct total', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.openHomePage();
  await productPage.openProduct('Samsung galaxy s6');

  let dialogPromise = page.waitForEvent('dialog');
  await productPage.addToCart();

  let dialog = await dialogPromise;
  await expect(dialog.message()).toContain('Product added');
  await dialog.accept();

  await productPage.openHomePage();
  await productPage.openProduct('Nokia lumia 1520');

  dialogPromise = page.waitForEvent('dialog');
  await productPage.addToCart();

  dialog = await dialogPromise;
  await expect(dialog.message()).toContain('Product added');
  await dialog.accept();

  await productPage.openCart();

  await expect(page.locator('.success')).toHaveCount(2);
  await expect(page.locator('.success').filter({ hasText: 'Samsung galaxy s6' })).toHaveCount(1);
  await expect(page.locator('.success').filter({ hasText: 'Nokia lumia 1520' })).toHaveCount(1);
  await expect(page.locator('#totalp')).toHaveText('1180');
});
