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

test('should open place order modal from cart', async ({ page }) => {
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

  await expect(page.locator('#orderModal')).toBeVisible();
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#card')).toBeVisible();
});

test('should show order confirmation details', async ({ page }) => {
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
  await expect(page.locator('.sweet-alert p')).toContainText('Amount: 360 USD');
  await expect(page.locator('.sweet-alert p')).toContainText('Card Number: 1234123412341234');
  await expect(page.locator('.sweet-alert p')).toContainText('Name: Kate');
});

test('should require name and credit card for order', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await productPage.openHomePage();
  await productPage.openProduct('Samsung galaxy s6');

  const productDialogPromise = page.waitForEvent('dialog');
  await productPage.addToCart();

  const productDialog = await productDialogPromise;
  expect(productDialog.message()).toContain('Product added');
  await productDialog.accept();

  await cartPage.openCart();

  await expect(page.locator('.success')).toContainText('Samsung galaxy s6');

  await cartPage.clickPlaceOrder();

  const orderDialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Please fill out Name and Creditcard.');
      await dialog.accept();
      resolve();
    });
  });
  await cartPage.clickPurchase();
  await orderDialogPromise;
});

test('should close place order modal without purchase', async ({ page }) => {
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
  await expect(page.locator('#orderModal')).toBeVisible();

  await page.locator('#orderModal .btn-secondary').click();

  await expect(page.locator('#orderModal')).not.toBeVisible();
  await expect(page.locator('.success')).toContainText('Samsung galaxy s6');
});
