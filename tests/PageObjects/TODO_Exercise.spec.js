const {test, expect } = require('@playwright/test');

test.only ('Basic TodoMVC test', async ({ page }) => {

  // 1. Go to website page
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.waitForTimeout(2000); // Wait for 2 seconds

  // 2. Confirm that you are in the correct URL
const url = 'https://todomvc.com/examples/react/dist/';
await expect(page).toHaveURL(url);
await page.waitForTimeout(2000);// Wait for 2 seconds before finishing the test
await page.screenshot({ path: 'screenshots/screenshot-1.png' });

 // 3. Add a TODO item with the text “TODO 1 - ” concatenated with the current date.
const fieldSelector = "//input[@id='todo-input']"; 
//const currentDate = new Date().toISOString().split('T')[0];
const todo1Text = "TODO 1 ${currentDate}`"; //Construct the TODO text with current date 
await page.fill(fieldSelector, todo1Text);
await page.waitForTimeout(2000);
await page.press(fieldSelector, 'Enter');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/screenshot-2.png' });

// 4. Verify that the new to-do item appears in the list
const checkBox = "//input[@class='toggle']"
await page.click(checkBox);

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
await page.screenshot({ path: 'screenshots/screenshot-6.png' });
// 8.4 Once is visible i deleted
const deleteTodo2 = page.locator('.todo-list li:nth-child(2) .destroy');
await deleteTodo2.click(); // Click on the delete X
await page.screenshot({ path: 'screenshots/screenshot-7.png' });

// Step 9: Verify the second item is removed from the list
const todoList = page.locator('.todo-list');
await expect(todoList).not.toContainText(todo2Text);
});