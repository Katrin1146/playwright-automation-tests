import { test, expect } from '@playwright/test';

test('POST login with invalid password returns wrong password error', async ({ request }) => {
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

test('POST login returns auth token for valid user', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: 'testuser12345679',
      password: Buffer.from('123456').toString('base64')
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toContain('Auth_token:');
});

test('POST login without username returns error status', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: '',
      password: Buffer.from('123456').toString('base64')
    }
  });

  expect(response.status()).toBe(500);
});

test('POST login without password returns wrong password error', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: 'testuser12345679',
      password: ''
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty('errorMessage');
  expect(data.errorMessage).toContain('Wrong password');
});
