import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignupPage';

test('should register new user', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  const username = `user_${Date.now()}`;
  const password = '123456';

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  const dialogPromise = page.waitForEvent('dialog');

  await signUpPage.signUp(username, password);

  const dialog = await dialogPromise;
  await expect(dialog.message()).toContain('Sign up successful');
  await dialog.accept();
});

test('should not register existing user', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  const username = 'testuser12345679';
  const password = '123456';

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  const dialogPromise = page.waitForEvent('dialog');

  await signUpPage.signUp(username, password);

  const dialog = await dialogPromise;
  await expect(dialog.message()).toContain('This user already exist.');
  await dialog.accept();
});

test('should not register with empty username', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  const username = '';
  const password = '123456';

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  const dialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain('Please fill out Username and Password.');
      await dialog.accept();
      resolve();
    });
  });

  await signUpPage.signUp(username, password);
  await dialogPromise;
});

test('should not register with empty password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  const username = `user_${Date.now()}`;
  const password = '';

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  const dialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain('Please fill out Username and Password.');
      await dialog.accept();
      resolve();
    });
  });

  await signUpPage.signUp(username, password);
  await dialogPromise;
});

test('should not register with empty username and password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  const username = '';
  const password = '';

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  const dialogPromise = new Promise<void>(resolve => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).toContain('Please fill out Username and Password.');
      await dialog.accept();
      resolve();
    });
  });

  await signUpPage.signUp(username, password);
  await dialogPromise;
});

test('should open and close signup modal', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  await signUpPage.openHomePage();
  await signUpPage.openSignUpModal();

  await expect(page.locator('#signInModal')).toBeVisible();
  await expect(page.locator('#sign-username')).toBeVisible();
  await expect(page.locator('#sign-password')).toBeVisible();

  await page.locator('#signInModal .btn-secondary').click();

  await expect(page.locator('#signInModal')).not.toBeVisible();
});
