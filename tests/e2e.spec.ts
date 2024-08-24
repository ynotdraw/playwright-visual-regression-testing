import { test, expect } from '@playwright/test';

test('can interact with closed root shadow DOM elements', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=e2e--primary&viewMode=story');

  const openModalButton = page.getByTestId('open-modal');
  const tag = page.getByTestId('tag-state');
  const modalInput = page.getByTestId('input');
  const modalTextarea = page.getByTestId('textarea');

  await expect(openModalButton).toBeVisible();
  expect(tag).toHaveText('Not submitted');

  await expect(modalInput).toBeHidden();
  await expect(modalTextarea).toBeHidden();

  await openModalButton.click();

  // Opening our Modal should make these elements visible
  await expect(modalInput).toBeVisible();
  await expect(modalTextarea).toBeVisible();

  // We'll start the test off by submitting it in an empty
  // state to ensure it doesn't submit and doesn't close
  // the modal.
  const submitButton = page.getByTestId('modal-submit');
  await submitButton.waitFor();
  await submitButton.click();

  // Ensure the modal remains open when the submit button
  // is pressed without being completed.
  await expect(modalInput).toBeVisible();
  await expect(modalTextarea).toBeVisible();

  // Lame, but without moving focus to something else,
  // the snapshot test becomes flaky. This is because Input
  // and Textarea have a cursor that sometimes blinks,
  // so in some screenshots it's there, and others it's not,
  // which leads to flaky tests.  Moving focus to our submit
  // button between interactions helps prevent this issue.
  await submitButton.focus();

  await expect(page).toHaveScreenshot('input-in-error.png');

  // Fill in the input
  await modalInput.pressSequentially('Obi-Wan Kenobi');
  await submitButton.focus();

  await expect(page).toHaveScreenshot('name-entered.png');

  // Fill in the textarea
  await modalTextarea.pressSequentially('Jedi Knight');
  await submitButton.focus();

  await expect(page).toHaveScreenshot('name-and-description-entered.png');

  // Submit our Modal...
  await submitButton.click();

  await expect(page).toHaveScreenshot('submitted.png');

  // ...and verify our tag got updated with the FormData
  expect(tag).toHaveText('Obi-Wan Kenobi|Jedi Knight', { timeout: 5000 });
});
