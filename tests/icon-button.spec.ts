import { test, expect } from '@playwright/test';

test('can interact with Icon Button elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=icon-button--primary&viewMode=story');

  const tag = page.getByTestId('tag-state');
  const button = page.getByTestId('button');

  await expect(button).toBeVisible();
  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-state.png');

  await button.click();

  expect(tag).toHaveText('Clicked', { timeout: 5000 });

  await expect(page).toHaveScreenshot('clicked.png');
});
