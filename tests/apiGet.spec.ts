import { test, expect } from '@playwright/test';

test('GET products', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.Items.length).toBeGreaterThan(0);
});

test('GET products contain required product fields', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.status()).toBe(200);

  const data = await response.json();
  const product = data.Items[0];

  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('title');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('desc');
  expect(product).toHaveProperty('cat');
  expect(product).toHaveProperty('img');
});

test('GET products return valid prices', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.status()).toBe(200);

  const data = await response.json();

  for (const product of data.Items) {
    expect(typeof product.price).toBe('number');
    expect(product.price).toBeGreaterThan(0);
  }
});

test('GET invalid endpoint returns error status', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/not-found');

  expect(response.status()).toBe(404);
});
