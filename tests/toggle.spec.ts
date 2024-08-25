import { test, expect } from '@playwright/test';

test('can interact with Toggle elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=toggle--primary&viewMode=story');

  const tag = page.getByTestId('tag-state');
  const toggle = page.getByTestId('toggle');

  await expect(toggle).toBeVisible();
  expect(tag).toHaveText('Not clicked');

  // Doesn't seem to be working for some reason.
  // Also tried `.check()` with no luck:
  // await toggle.check({ force: true });
  // but Playwright doesn't recognize it as a checkbox or radio
  // await toggle.click();

  await toggle.evaluate((element: HTMLInputElement) => element.click());

  expect(tag).toHaveText('true', { timeout: 5000 });

  await expect(page).toHaveScreenshot('clicked.png');
});
