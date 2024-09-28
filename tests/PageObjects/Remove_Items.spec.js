import { test, expect } from '@playwright/test';

test ('Remove items', async ({ page }) => {
await page.goto('https://todomvc.com/examples/react/dist/#/completed');

// Step 8: Delete the second TODO item
//8.1 Make them all visible
const showAllButtonXpath = "//a[normalize-space()='All']";  
await page.click(showAllButtonXpath);  // Now use it after assignment
await page.waitForTimeout(5000);

//8.2 Select todo2
const selectTodo2 = page.locator('li:nth-child(2) div:nth-child(1) input:nth-child(1)');
await page.waitForTimeout(2000);
//8.3 Delete only appears passing the mouse over
await page.hover('.todo-list li:nth-child(2)'); // Hover over the second item to reveal the delete button
await selectTodo2.click(); 
await page.waitForTimeout(2000);
// 8.4 Once is visible i deleted
const deleteTodo2 = page.locator('.todo-list li:nth-child(2) .destroy');
await deleteTodo2.click(); // Click on the delete X
await page.screenshot({ path: 'screenshots/screenshot-4.png' });

// Step 9: Verify the second item is removed from the list
const todoList = page.locator('.todo-list');
await expect(todoList).not.toContainText(todo2Text);
await page.waitForTimeout(5000);
});