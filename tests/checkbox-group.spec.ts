import { test, expect } from '@playwright/test';

test('can interact with Checkbox elements', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=checkbox-group--primary&viewMode=story',
  );

  const tag = page.getByTestId('tag-state');
  const checkboxGroup = page.getByTestId('checkbox-group');
  const checkboxOne = page.getByTestId('option-1');
  const checkboxTwo = page.getByTestId('option-2');
  const checkboxThree = page.getByTestId('option-3');

  await expect(checkboxGroup).toBeVisible();
  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-state.png');

  // Calling `click()` on it directly via `evaluate` works,
  // but Playwright's `locator.click()` does not.
  // https://playwright.dev/docs/api/class-locator#locator-evaluate
  await checkboxOne.evaluate((element: HTMLInputElement) => element.click());

  expect(tag).toHaveText('one', { timeout: 5000 });

  await expect(page).toHaveScreenshot('one-clicked.png');

  // Calling `click()` on it directly via `evaluate` works,
  // but Playwright's `locator.click()` does not.
  // https://playwright.dev/docs/api/class-locator#locator-evaluate
  await checkboxTwo.evaluate((element: HTMLInputElement) => element.click());

  expect(tag).toHaveText('two', { timeout: 5000 });

  await expect(page).toHaveScreenshot('two-clicked.png');

  // Calling `click()` on it directly via `evaluate` works,
  // but Playwright's `locator.click()` does not.
  // https://playwright.dev/docs/api/class-locator#locator-evaluate
  await checkboxThree.evaluate((element: HTMLInputElement) => element.click());

  expect(tag).toHaveText('three', { timeout: 5000 });

  await expect(page).toHaveScreenshot('three-clicked.png');
});
