import { test, expect } from '@playwright/test';

test('can interact with the Split Button element', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=splitbutton--primary&viewMode=story');

  const tag = page.getByTestId('tag-state');
  const splitContainer = page.getByTestId('split');
  const primaryButton = page.getByTestId('primary-button');
  const menuOptionThree = page.getByTestId('menu-option-3');

  await expect(splitContainer).toBeVisible();
  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default.png');

  await primaryButton.click();

  expect(tag).toHaveText('primary button clicked', { timeout: 5000 });
  await expect(page).toHaveScreenshot('primary-clicked.png');

  // There should be a way to programatically click the
  // split button additional actions menu button.
  // It lives in the closed shadow root, so there's no way to access it
  // at the moment, so this doesn't work either.
  // Error: locator.click: Element is not visible
  //   Call log:
  //     - waiting for getByTestId('menu-option-3')
  //     -   locator resolved to <glide-core-menu-button label="Three" tabindex="-1" role="menuitem" id="leVlk3y4-7ohmhd3z9ONs" data-testid="menu-option-3"></glide-core-menu-button>
  //     - attempting click action
  //     -   scrolling into view if needed
  await menuOptionThree.click({ force: true });

  expect(tag).toHaveText('option 3 clicked', { timeout: 5000 });
  await expect(page).toHaveScreenshot('option-3-clicked.png');
});
