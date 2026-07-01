# Demoblaze Playwright QA Automation

Automated UI and API test project for the public Demoblaze demo e-commerce site.  
This project demonstrates Playwright test automation skills, Page Object Model usage, API checks, and GitHub Actions CI setup.

Current coverage: **36 automated tests**.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- GitHub Actions

## Covered UI Features

- User signup
- User login and logout
- Contact form modal and submission
- Product catalog checks
- Add one product to cart
- Add multiple products to cart
- Verify cart product names and total price
- Remove product from cart
- Place order modal
- Successful order submission
- Order confirmation details
- Required field validation where supported by the application

## Covered API Checks

- GET products returns status `200`
- GET products returns a non-empty product list
- Product objects contain required fields
- Product prices are valid numbers
- Invalid endpoint returns `404`
- Login API returns auth token for valid credentials
- Login API returns expected errors for invalid or missing data

## Installation

```bash
npm install
npx playwright install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```text
.
├── pages/                  # Page Object classes
├── tests/                  # UI and API test specs
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project scripts and dependencies
└── .github/workflows/      # GitHub Actions CI configuration
```

## CI/CD

GitHub Actions runs the Playwright test suite on pushes and pull requests to `main` or `master`.

Workflow steps:

- Checkout repository
- Install Node.js
- Install dependencies with `npm ci`
- Install Playwright browsers
- Run Playwright tests

## Notes

Demoblaze is a public demo website. Because the application and API are external dependencies, tests may occasionally be affected by network issues, slow responses, shared test data, or temporary site instability.
