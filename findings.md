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
  - Use `pressSequentially()` instead of `fill()`. Unclear why, need to dig in more.
- Textarea
  - Use `pressSequentially()` instead of `fill()`. Unclear why, need to dig in more.
- Checkbox
  - Calling `click()` doesn't toggle the state, even though it works when done in JavaScript
  - Must use `evaluate()` and call `click()` through it
- Toggle
  - Calling `click()` doesn't toggle the state, even though it works when done in JavaScript
  - Must use `evaluate()` and call `click()` through it

Notes about `evaluate`:

> However, using evaluate might be necessary if:
>
> - The element uses a custom implementation of click, and you want to ensure that specific behavior is triggered.
> - You want to chain or combine other custom actions within the same evaluation.
>
> Calling click via evaluate on a custom element allows you to interact directly with the element's methods and ensures that any custom behavior associated with that element's click method is executed. This approach is particularly useful when dealing with complex web components or custom elements that have overridden or extended behavior on interaction.

## Components with issues

- Tree Item Menu
  - Can't be clicked to be opened, has issues with visibility
  - Focus puts the three-dot menu in view, but it still seems to have `visbility: hidden` which blocks Playwright from accessing it
- Split Button's menu icon button
  - Can't be clicked - wonder if a click method on the host would help? Not sure.
