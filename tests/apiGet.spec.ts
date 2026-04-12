import { test, expect } from '@playwright/test';

test('GET products', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.Items.length).toBeGreaterThan(0);
});