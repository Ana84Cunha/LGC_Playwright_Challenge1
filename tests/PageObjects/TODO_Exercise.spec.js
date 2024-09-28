const { test, expect } = require('@playwright/test');

test.only('Basic TodoMVC test', async ({ page }) => {

    // 1. Go to website page
    await page.goto('https://todomvc.com/examples/react/dist/');
    
    // 2. Confirm that you are in the correct URL
    const url = 'https://todomvc.com/examples/react/dist/';
    await expect(page).toHaveURL(url);
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.screenshot({ path: 'screenshots/screenshot-1.png' });

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

    // 6. Mark the current date TODO item as completed
    const currentDateTodoSelector = "li:nth-child(1) div:nth-child(1) input:nth-child(1)" // Select the checkbox for TODO 1
    await page.click(currentDateTodoSelector); // Select TODO 1 
    await page.waitForTimeout(5000);
    const markCompletedButton = await page.$("a[href='#/completed']"); // Selector for the Completed button
    await markCompletedButton.click(); // Click on the Completed button
    await page.waitForTimeout(5000); 
    await page.screenshot({ path: 'screenshots/screenshot-4.png' });

    // 7. Verify that the item is displayed as completed (e.g., struck-through text).
    const firstTodo = page.locator("li[class='completed'] label[data-testid='todo-item-label']");
    await expect(firstTodo).toHaveClass(/completed/);
    await page.waitForTimeout(5000); 
    await page.screenshot({ path: 'screenshots/screenshot-5.png' });

    // Step 8: Delete the second TODO item
    //a) Make them all visible
  const showAllButtonXpath = "//a[normalize-space()='All']";  
  await page.click(showAllButtonXpath); 
  await page.waitForTimeout(5000); 
  await page.waitForTimeout(2000); // Ensure all todos are visible

  // b) Select the second TODO item and hover to reveal the delete button
  const todoListItems = page.locator('.todo-list li'); // Locate all TODO items
  await todoListItems.nth(1).hover(); // Hover over the second item (index 1)

  // c) Click the delete button
  const deleteButton = todoListItems.nth(1).locator('.destroy'); // Select the delete button
  await deleteButton.click(); // Click on the delete button
  await page.waitForTimeout(5000); // Wait for the deletion to process
  await page.screenshot({ path: 'screenshots/screenshot-6.png' });

  // 9. Verify the second item is removed from the list
  const todoList = page.locator('.todo-list');
  await expect(todoList).not.toContainText(todo2Text);
});