import { test, expect } from '@playwright/test';

test('can interact with Tab elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=tabs--primary&viewMode=story');

  const tabOne = page.getByTestId('tab-1');
  const tabTwo = page.getByTestId('tab-2');
  const panelOne = page.getByTestId('panel-1');
  const panelTwo = page.getByTestId('panel-2');

  await expect(tabOne).toBeVisible();
  await expect(tabTwo).toBeVisible();
  await expect(panelOne).toBeVisible();
  await expect(panelTwo).toBeHidden();

  await expect(page).toHaveScreenshot('tab-1-active.png');

  await tabTwo.click();

  await expect(panelOne).toBeHidden();
  await expect(panelTwo).toBeVisible();

  await expect(page).toHaveScreenshot('tab-2-active.png');
});
