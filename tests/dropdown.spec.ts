import { test, expect } from '@playwright/test';

test('can interact with Dropdown elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=dropdown--primary&viewMode=story');

  const dropdown = page.getByTestId('dropdown');
  const optionOne = page.getByTestId('option-1');
  const optionTwo = page.getByTestId('option-2');
  const optionThree = page.getByTestId('option-3');

  await expect(dropdown).toBeVisible();
  await expect(optionOne).toBeHidden();
  await expect(optionTwo).toBeHidden();
  await expect(optionThree).toBeHidden();

  const tag = page.getByTestId('tag-state');

  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-state.png');

  await dropdown.click();
  await expect(optionOne).toBeVisible();
  await expect(optionTwo).toBeVisible();
  await expect(optionThree).toBeVisible();

  await expect(page).toHaveScreenshot('after-opening.png');

  await optionThree.click();

  expect(tag).toHaveText('three', { timeout: 5000 });

  await expect(page).toHaveScreenshot('after-clicking-option-3.png');
});

test('can interact with filterable Dropdown elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=dropdown--filterable&viewMode=story');

  const dropdown = page.getByTestId('dropdown');
  const optionOne = page.getByTestId('option-1');
  const optionEleven = page.getByTestId('option-11');

  await expect(dropdown).toBeVisible();
  await expect(optionOne).toBeHidden();
  await expect(optionEleven).toBeHidden();

  const tag = page.getByTestId('tag-state');

  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-filterable-state.png');

  await dropdown.click();
  await dropdown.pressSequentially('Eleven');

  await expect(optionOne).toBeHidden();
  await expect(optionEleven).toBeVisible();

  await expect(page).toHaveScreenshot('after-filterable-opening.png');

  await optionEleven.click();

  expect(tag).toHaveText('eleven', { timeout: 5000 });

  await expect(page).toHaveScreenshot(
    'after-filterable-clicking-option-11.png',
  );
});
