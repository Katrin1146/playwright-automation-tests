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

