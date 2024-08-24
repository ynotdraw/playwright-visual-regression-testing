import { test, expect } from '@playwright/test';

test('can interact with Radio elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=radio--primary&viewMode=story');

  const tag = page.getByTestId('tag-state');
  const group = page.getByTestId('radio-group');
  const radioOne = page.getByTestId('one');
  const radioTwo = page.getByTestId('two');
  const radioThree = page.getByTestId('three');

  await expect(group).toBeVisible();
  expect(tag).toHaveText('Not clicked');

  await radioTwo.click();

  expect(tag).toHaveText('two', { timeout: 2000 });
  const radioTwoChecked = await radioTwo.isChecked();
  expect(radioTwoChecked).toBeTruthy();
  await expect(page).toHaveScreenshot('two.png');

  await radioThree.click();

  expect(tag).toHaveText('three', { timeout: 2000 });
  const radioThreeChecked = await radioThree.isChecked();
  expect(radioThreeChecked).toBeTruthy();
  await expect(page).toHaveScreenshot('three.png');

  await radioOne.click();

  expect(tag).toHaveText('one', { timeout: 2000 });
  const radioOneChecked = await radioOne.isChecked();
  expect(radioOneChecked).toBeTruthy();
  await expect(page).toHaveScreenshot('one.png');
});
