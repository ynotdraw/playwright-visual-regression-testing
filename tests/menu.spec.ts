import { test, expect } from '@playwright/test';

test('can interact with Menu elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=menu--primary&viewMode=story');

  const target = page.getByTestId('target');
  const menuOptions = page.getByTestId('menu-options');
  const optionThree = page.getByTestId('option-3');

  await expect(target).toBeVisible();
  await expect(menuOptions).toBeHidden();

  const tag = page.getByTestId('tag-state');

  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-state.png');

  await target.click();
  await expect(menuOptions).toBeVisible();
  await expect(optionThree).toBeVisible();

  await expect(page).toHaveScreenshot('after-opening.png');

  await optionThree.click();

  expect(tag).toHaveText('Clicked', { timeout: 5000 });

  await expect(page).toHaveScreenshot('after-clicking-option-3.png');
});
