import { test, expect } from '@playwright/test';

test ('Add items', async ({ page }) => {
await page.goto('https://todomvc.com/examples/react/dist/');


// 3. Add a TODO item with the text “TODO 1 - ” concatenated with the current date.
const fieldSelector = "//input[@id='todo-input']"; 
const currentDate = new Date().toLocaleDateString(); // Formatted current date
const todo1Text = "TODO 1 - " + currentDate; // + operator to concatenate
await page.fill(fieldSelector, todo1Text);
await page.press(fieldSelector, 'Enter');
await page.waitForTimeout(5000); // Wait for 5 seconds
await page.screenshot({ path: 'screenshots/screenshot-2.png' });

// 4. Verify that the new to-do item appears in the list
const todoItemSelector = "label[data-testid='todo-item-label']";
await page.waitForSelector(todoItemSelector);
await page.click(todoItemSelector);

// 5. Add a TODO item with the text “TODO 2 - ” concatenated with the next day (tomorrow)
//const tomorrow = new Date(); // doesnt work
//tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow , doesnt work
//const todo2Text = "TODO 2 - " + tomorrow.toLocaleDateString(); // Format the date doesnt work
const todo2Text = "TODO 2" 
await page.fill(fieldSelector, todo2Text); // Fill the input with the new TODO text
await page.press(fieldSelector, 'Enter'); // Submit the new TODO item
await page.waitForTimeout(5000); 
await page.screenshot({ path: 'screenshots/screenshot-3.png' });

// 6 & 7 Mark and Verify the item the current date TODO item as completed
const currentDateTodoSelector = "li:nth-child(1) div:nth-child(1) input:nth-child(1)" // Select the checkbox for TODO 1
await page.click(currentDateTodoSelector); // Select TODO 1 
await page.waitForTimeout(5000);
const markCompletedButton = await page.$("a[href='#/completed']"); // Selector for the Completed button
await markCompletedButton.click(); // Click on the Completed button
await page.waitForTimeout(5000); 
await page.screenshot({ path: 'screenshots/screenshot-4.png' });
});