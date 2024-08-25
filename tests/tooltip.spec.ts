import { test, expect } from '@playwright/test';

test('can interact with Tooltip elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=tooltip--primary&viewMode=story');

  const target = page.getByTestId('target');
  const tooltip = page.getByTestId('tooltip');
  const kbd = page.getByTestId('kbd');

  await expect(target).toBeVisible();
  await expect(kbd).toBeHidden();

  await expect(page).toHaveScreenshot('default-state.png');

  await target.hover();

  await expect(tooltip).toBeVisible();
  await expect(kbd).toBeVisible();

  await expect(page).toHaveScreenshot('after-hovering.png');
});
