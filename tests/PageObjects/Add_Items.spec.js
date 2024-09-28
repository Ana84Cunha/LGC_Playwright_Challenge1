import { test, expect } from '@playwright/test';

test ('Add items', async ({ page }) => {
await page.goto('https://todomvc.com/examples/react/dist/');

// 3. Add a TODO item with the text “TODO 1 - ” concatenated with the current date.
const fieldSelector = "//input[@id='todo-input']";
const currentDate = new Date().toISOString().split('T')[0];
const todo1Text = `TODO 1 - ${currentDate}`; // Construct the TODO text with current date
await page.fill(fieldSelector, todo1Text);
await page.waitForTimeout(2000);
await page.press(fieldSelector, 'Enter');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/screenshot-2.png' });

// 4. Verify that the new to-do item appears in the list
const checkBox = "//input[@class='toggle']"
await page.click(checkBox);;

// 5.Add a TODO item with the text “TODO 2 - ” concatenated with the next day (tomorrow)
const inputSelector2 = "//input[@id='todo-input']";
const todo2Text = "TODO 2";
await page.fill(inputSelector2, todo2Text);
await page.press(inputSelector2, 'Enter');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/screenshot-3.png' });

// 6.Mark the current date TODO item as completed
const markCompleted = await page.$("//a[normalize-space()='Completed']");
await markCompleted.click();
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/screenshot-4.png' });

//7. Verify that the item is displayed as completed (e.g., struck-through text).
const firstodo1Text = page.locator('.todo-list li').first();
await expect(firstodo1Text).toHaveClass(/completed/);
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/screenshot-5.png' });
});