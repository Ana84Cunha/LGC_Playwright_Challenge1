import { test, expect } from '@playwright/test';

test ('Remove items', async ({ page }) => {
await page.goto('https://todomvc.com/examples/react/dist/#/completed');


// Step 8: Delete the second TODO item
    //a) Make them all visible
    const showAllButtonXpath = "//a[normalize-space()='All']";  
    await page.click(showAllButtonXpath); 
    await page.waitForTimeout(5000); // Ensure all todos are visible
  
    // b) Select the second TODO item and hover to reveal the delete button
    const todoListItems = page.locator('.todo-list li'); // Locate all TODO items
    await todoListItems.nth(1).hover(); // Hover over the second item (index 1)
  
    // c) Click the delete button
    const deleteButton = todoListItems.nth(1).locator('.destroy'); // Select the delete button
    await deleteButton.click(); // Click on the delete button
    await page.screenshot({ path: 'screenshots/screenshot-5.png' });
  
    // 9. Verify the second item is removed from the list
    const todoList = page.locator('.todo-list');
    await expect(todoList).not.toContainText(todo2Text);
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/screenshot-5.png' });
  });