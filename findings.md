# Findings

Overall findings testing with Playwright.

## TODO

- Menu (by itself)
- Dropdown
- Icon Button
- Toasts

## Components that seem to work just fine

- Button
- Form Controls Layout
- Radio Group + Radios
- Modal
- Status Indicator
- Tabs
- Tag

## Components that work with a minor adjustment

- Input
  - Use `pressSequentially()` instead of `fill()`
- Textarea
  - Use `pressSequentially()` instead of `fill()`

## Components with issues

- Checkbox
  - Calling `click()` doesn't toggle the state, even though it works when done in JavaScript
- Toggle
  - Calling `click()` doesn't toggle the state, even though it works when done in JavaScript
- Tree Item Menu
  - Can't be clicked to be opened, has issues with visibility
  - Focus puts the three-dot menu in view, but it still seems to have `visbility: hidden` which blocks Playwright from accessing it
- Split Button's menu icon button
  - Can't be clicked - wonder if a click method on the host would help? Not sure.
