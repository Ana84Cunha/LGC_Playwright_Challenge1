const {test, expect } = require('@playwright/test');

test ('Navigation and URL validation', async ({ page }) => {
  // 1. Go to website page
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.waitForTimeout(2000); // Wait for 2 seconds

  // 2. Confirm that you are in the correct URL
const url = 'https://todomvc.com/examples/react/dist/';
await expect(page).toHaveURL(url);
await page.waitForTimeout(2000); // Wait for 2 seconds before finishing the test
await page.screenshot({ path: 'screenshots/screenshot-1.png' });
});