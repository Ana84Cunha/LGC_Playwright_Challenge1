# LGC_Playwright_Challenge1
This project automates the basic functionalities of the TodoMVC application using Playwright and JavaScript. It demonstrates how to create and run UI tests, including verifying that the application loads correctly, add, complete, and delete tasks.

## Objectives
The test automation focuses on:
- Ensuring the application loads correctly.
- Adding and verifying TODO items.
- Marking TODO items as completed and confirming their status.
- Deleting a TODO item and ensuring it was removed from the list.
- Generating test reports and capturing screenshots and videos of the test execution.

## Environment Setup
Ensure the following tools are installed:
- **Playwright**: Used for automating browser interactions.
- **Node.js**: JavaScript runtime for executing the tests.
- **Allure**: For generating test reports.

### Prerequisites
- Node.js 
- NPM (Node package manager)
- Playwright and its dependencies (installed via NPM)

### Install Dependencies
Run the following command to install all required project dependencies: npm install

# Getting started
To run the tests, follow these steps:
1. Clone this repository to your local machine:
git clone <https://github.com/Ana84Cunha/LGC_Playwright_Challenge1.git>
2. Navigate to the project directory:cd LGC_Playwright_Challenge1
3. Install the required dependencies by running: npm install
4. Run the tests using:
 a)To run all test: npx playwright test
 b)To run tests with the Playwright Test UI: npx playwright test --ui
5. To open the allure report : allure open

# Additonally:
- Screenshots: Captured screenshots from test executions are stored in the screenshots/ directory.
- Video Recordings: Video recordings can be found in the test-results/ directory.
- Test Reports: Allure reports will be generated and can be viewed by running ( allure open).

These files demonstrate the application at different stages of the test execution.

