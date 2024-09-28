import { test, expect } from '@playwright/test';

test ('Add items', async ({ page }) => {
await page.goto('https://todomvc.com/examples/react/dist/');

// 3. Add a TODO item with the text “TODO 1 - ” concatenated with the current date.
const fieldSelector = "//input[@id='todo-input']"; 
const currentDate = new Date().toLocaleDateString(); // Formatted current date
const todo1Text = "TODO 1 - " + currentDate;
await page.fill(fieldSelector, todo1Text);
await page.press(fieldSelector, 'Enter');
await page.screenshot({ path: 'screenshots/screenshot-2.png' });

// 4. Verify that the new to-do item appears in the list
const todoItemAppears = `//label[text()="${todo1Text}"]`;
await page.waitForSelector(todoItemAppears, { state: 'visible' });

// 5. Add a TODO item with the text “TODO 2 - ” concatenated with the next day (tomorrow)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const todo2Text = "TODO 2 - " + tomorrow.toLocaleDateString();
await page.fill(fieldSelector, todo2Text);
await page.press(fieldSelector, 'Enter');
await page.screenshot({ path: 'screenshots/screenshot-3.png' });

// 6. Mark the current date TODO item as completed
const markCompleted = await page.$("//a[normalize-space()='Completed']");
await markCompleted.click();
await page.screenshot({ path: 'screenshots/screenshot-4.png' });

// 7. Verify that the item is displayed as completed (e.g., struck-through text).
const firstTodo = page.locator(`label:has-text("${todo1Text}")`).first();
await expect(firstTodo).toHaveClass(/completed/);
await page.screenshot({ path: 'screenshots/screenshot-5.png' });
});