import { test, expect } from '@playwright/test';

test('can interact with Tree elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=tree--primary&viewMode=story');

  const treeItem = page.getByTestId('leaf-2');
  const treeItemMenu = page.getByTestId('leaf-2-menu');
  const treeItemMenuButton = page.getByTestId('edit');

  await expect(treeItem).toBeVisible();

  const tag = page.getByTestId('tag-state');

  expect(tag).toHaveText('Not clicked');

  await expect(page).toHaveScreenshot('default-state.png');

  // await treeItem.focus();

  // Calling `focus()` on it directly via `evaluate` works,
  // but Playwright's `locator.focus()` does not.
  // https://playwright.dev/docs/api/class-locator#locator-evaluate
  await treeItem.evaluate((element) => element.focus());

  await expect(page).toHaveScreenshot('focused.png');

  // There's a bug with Tree, where it's not visible.
  // The reason is that it has `visibility: hidden`, so it can't
  // be accessed by Playwright.
  //
  //   Error: locator.click: Test timeout of 30000ms exceeded.
  // Call log:
  //   - waiting for getByTestId('leaf-2-menu')
  //   -   locator resolved to <glide-core-tree-item-menu slot="menu" label="Actions" placement="bottom-start" data-testid="leaf-2-menu">…</glide-core-tree-item-menu>
  //   - attempting click action
  //   -   waiting for element to be visible, enabled and stable
  //   -   element is not visible
  // await treeItemMenu.click();

  // Calling `click()` on it directly via `evaluate` works,
  // but Playwright's `locator.click()` does not.
  // https://playwright.dev/docs/api/class-locator#locator-evaluate
  await treeItemMenu.evaluate((element: HTMLButtonElement) => element.click());

  await expect(page).toHaveScreenshot('menu-open.png');

  await treeItemMenuButton.click();

  expect(tag).toHaveText('Clicked', { timeout: 5000 });

  await expect(page).toHaveScreenshot('after-click.png');
});
