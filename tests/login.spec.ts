import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should login user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = 'testuser12345679'; 
  const password = '123456';

  await loginPage.open();
  await loginPage.openLoginModal();
  await loginPage.login(username, password);

  
  await expect(page.locator('#logout2')).toBeVisible();
});