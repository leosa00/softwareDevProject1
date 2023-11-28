const { test, expect } = require("@playwright/test");

test('User can add a new shopping list', async ({ page }) => {
  await page.goto('http://host.docker.internal:7777/lists');
  await page.fill('input[name="name"]', 'Test List');
  await page.click('input[type="submit"]');
  const text = await page.textContent('body');
  expect(text).toContain('Test List');
});

test('Display shopping lists on the lists page', async ({ page }) => {
  await page.goto('http://host.docker.internal:7777/lists');
  const text = await page.textContent('body');
  expect(text).toContain('All shopping lists');
});

test('User can deactivate a shopping list', async ({ page }) => {
  await page.goto('http://host.docker.internal:7777/lists');
  await page.click('form[action*="/deactivate"] input[type="submit"]');
});


test('User can add items to a list', async ({ page }) => {
  await page.goto('http://host.docker.internal:7777/lists/47'); //list id 47 used for tests
  await page.fill('input[name="name"]', 'Test Item');
  await page.click('input[type="submit"]');
  const text = await page.textContent('body');
  expect(text).toContain('Test Item');
});

test('User can mark items as collected', async ({ page }) => {
  await page.goto('http://host.docker.internal:7777/lists/47'); //list id 47 used for tests
  await page.click('form[action*="/collect"] input[type="submit"]');
  
});
