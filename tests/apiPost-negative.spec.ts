import { test, expect } from '@playwright/test';

test('POST login success', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: 'testuser',
      password: '123456'
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();

    expect(data).toHaveProperty('errorMessage');
  expect(data.errorMessage).toContain('Wrong password');
});