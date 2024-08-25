import { test, expect } from '@playwright/test';

test('can interact with Drawer elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=drawer--primary&viewMode=story');

  const button = page.getByTestId('button');
  const content = page.getByTestId('content');

  await expect(button).toBeVisible();
  await expect(content).toBeHidden();

  await expect(page).toHaveScreenshot('default-state.png');

  await button.click();

  await expect(content).toBeVisible();

  await expect(page).toHaveScreenshot('clicked.png');
});
