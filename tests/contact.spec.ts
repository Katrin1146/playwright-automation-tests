import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test('should open contact modal', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openHomePage();
  await contactPage.openContactModal();

  await expect(page.locator('#exampleModal')).toBeVisible();
  await expect(page.locator('#recipient-email')).toBeVisible();
  await expect(page.locator('#recipient-name')).toBeVisible();
  await expect(page.locator('#message-text')).toBeVisible();
});

test('should close contact modal with Close button', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openHomePage();
  await contactPage.openContactModal();

  await expect(page.locator('#exampleModal')).toBeVisible();

  await contactPage.closeWithCloseButton();

  await expect(page.locator('#exampleModal')).not.toBeVisible();
});

test('should close contact modal with X button', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openHomePage();
  await contactPage.openContactModal();

  await expect(page.locator('#exampleModal')).toBeVisible();

  await contactPage.closeWithXButton();

  await expect(page.locator('#exampleModal')).not.toBeVisible();
});

test('should submit contact message successfully', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openHomePage();
  await contactPage.openContactModal();
  await contactPage.fillContactForm('kate@example.com', 'Kate', 'Test contact message');

  const dialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain('Thanks for the message!!');
      await dialog.accept();
      resolve();
    });
  });

  await contactPage.sendMessage();
  await dialogPromise;
});

test('should show success alert when contact form is empty', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.openHomePage();
  await contactPage.openContactModal();

  const dialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain('Thanks for the message!!');
      await dialog.accept();
      resolve();
    });
  });

  await contactPage.sendMessage();
  await dialogPromise;
});
