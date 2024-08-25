# Findings

Overall findings testing with Playwright.

## Components that seem to work just fine

- Button
- Drawer
- Dropdown (non-filterable)
- Form Controls Layout
- Icon Button
- Menu
- Modal
- Radio Group + Radios
- Status Indicator
- Tabs
- Tag

## Components that work with a minor adjustment

- Dropdown (filtering)
  - Use `pressSequentially()` instead of `fill()`. Unclear why, need to dig in more.
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
- Tree Item Menu
  - Can't be clicked to be opened with Playwright's `locator.click()` - has issues with visibility
    - Focus puts the three-dot menu in view, but it still seems to have `visbility: hidden` which blocks Playwright from accessing it
  - Must use `evaluate()` and call `focus()` and then `click()` through it

Notes about `evaluate`:

> However, using evaluate might be necessary if:
>
> - The element uses a custom implementation of click, and you want to ensure that specific behavior is triggered.
> - You want to chain or combine other custom actions within the same evaluation.
>
> Calling click via evaluate on a custom element allows you to interact directly with the element's methods and ensures that any custom behavior associated with that element's click method is executed. This approach is particularly useful when dealing with complex web components or custom elements that have overridden or extended behavior on interaction.

## Components with issues

- Split Button's menu icon button
  - Can't be clicked - wonder if a click method on the host would help? Not sure.
- Toasts
  - Can't be accessed at all, as each toast is in the closed shadow root of `glide-core-toasts`.
    - Does it make sense to adjust the component API of `glide-core-toasts` so that each toast is somehow in the light DOM or the consumer has access?
    - Should `glide-core-toasts` open its shadow root since it's only a container? Then consumers would have direct access to each `glide-core-toast` directly, but each `toast` would have their roots still closed.
