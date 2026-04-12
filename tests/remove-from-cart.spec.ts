import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('should remove product from cart', async ({ page }) => {
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

  await page.locator('a[onclick^="deleteItem"]').click();

  await expect(page.locator('.success')).toHaveCount(0);
});