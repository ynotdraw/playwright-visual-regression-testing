import { test, expect } from '@playwright/test';

test('can interact with Checkbox elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=checkbox--primary&viewMode=story');

  const tag = page.getByTestId('tag-state');
  const checkbox = page.getByTestId('checkbox');

  await expect(checkbox).toBeVisible();
  await expect(checkbox).toBeInViewport();
  expect(tag).toHaveText('Not clicked');

  // Doesn't seem to be working for some reason.
  // Also tried `.check()` with no luck:
  // await checkbox.check({ force: true });
  // but Playwright doesn't recognize it as a checkbox
  // await checkbox.click({ force: true });

  await checkbox.evaluate((element: HTMLInputElement) => element.click());

  expect(tag).toHaveText('true', { timeout: 5000 });

  await expect(page).toHaveScreenshot('clicked.png');
});
