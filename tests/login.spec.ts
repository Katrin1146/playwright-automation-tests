import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

async function expectLoginDialog(
  page: Page,
  loginPage: LoginPage,
  username: string,
  password: string,
  expectedMessage: string
) {
  await loginPage.open();
  await loginPage.openLoginModal();

  const dialogPromise = page.waitForEvent('dialog');
  await loginPage.login(username, password);

  const dialog = await dialogPromise;
  expect(dialog.message()).toContain(expectedMessage);
  await dialog.accept()
}

test('should login user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = 'testuser12345679'; 
  const password = '123456';

  await loginPage.open();
  await loginPage.openLoginModal();
  await loginPage.login(username, password);

  
  await expect(page.locator('#logout2')).toBeVisible();

});

test('should show logged in username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = 'testuser12345679';
  const password = '123456';

  await loginPage.open();
  await loginPage.openLoginModal();
  await loginPage.login(username, password);

  await expect(page.locator('#nameofuser')).toContainText(`Welcome ${username}`);
});

test('should logout user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = 'testuser12345679';
  const password = '123456';

  await loginPage.open();
  await loginPage.openLoginModal();
  await loginPage.login(username, password);

  await expect(page.locator('#logout2')).toBeVisible();
  await page.click('#logout2');

  await expect(page.locator('#login2')).toBeVisible();
  await expect(page.locator('#logout2')).not.toBeVisible();
});


test('should not login with wrong password', async ({page}) => {
   const loginPage = new LoginPage(page);

   const username = 'testuser12345679'; 
   const password = 'WrongPassword'; 

   await expectLoginDialog(page, loginPage, username, password, 'Wrong password');
  });

  test ('should not login with empty username', async({page}) => {
    const loginPage = new LoginPage(page);

   const username = ' '; 
   const password = '123456'; 

   await expectLoginDialog(page, loginPage, username, password, 'Wrong password');
  });

  test ('should not login with empty password', async({page}) => {
    const loginPage = new LoginPage(page);

   const username = 'testuser12345679'; 
   const password = ''; 

   await loginPage.open();
   await loginPage.openLoginModal();

   const dialogPromise = page.waitForEvent('dialog');
   const dialogAssertion = dialogPromise.then(async dialog => {
    expect(dialog.message()).toContain('Please fill out Username and Password.');
    await dialog.accept()
   });

   await loginPage.login(username, password);
   await dialogAssertion;
  });

  test ('should not login with empty username and password', async({page}) => {
    const loginPage = new LoginPage(page);

   const username = ''; 
   const password = ''; 

   await loginPage.open();
   await loginPage.openLoginModal();

   const dialogPromise = page.waitForEvent('dialog');
   const dialogAssertion = dialogPromise.then(async dialog => {
    expect(dialog.message()).toContain('Please fill out Username and Password.');
    await dialog.accept()
   });

   await loginPage.login(username, password);
   await dialogAssertion;
  });


  test ('should not login with non-existing user', async({page}) => {
    const loginPage = new LoginPage(page);

   const username = 'userDoesNotExist123456'; 
   const password = '123456'; 

   await expectLoginDialog(page, loginPage, username, password, 'User does not exist.');
  });
