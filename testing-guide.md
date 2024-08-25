# Playwright Testing Guide

This markdown file is intended to display how one can interact with Glide Core components with Playwright and see how interacting with closed shadow root components goes. Overall, things generally work well given these end-to-end style tests; however, we'll continue to do our due diligence to ensure things go smoothly and find areas of improvement.

Glide components use a closed shadow root, which means access to the internals of the component are blocked from JavaScript access. This is intentional due to the "black box" nature of Web Components and in particular with Design System components where we don't want people messing with the internals of the components, but rather interact directly with the surface-level, public APIs instead.

By interacting with the public APIs rather than reaching into the internals of a component, it means the tests will be less flaky and will be less likely to fail between upgrades of the library. When you reach into the internals of a library, you are signing yourself up for a lot of risk; however, if the public API is used, one can count on semantic versioning and the authors respecting breaking changes. Given this approach, we can test the components to see how well they play with Playwright, but **not** opening up the shadow root and instead interacting with the surface-level, public APIs instead.

## Try it yourself!

To go through these findings and tests yourself, you can do the following:

- Clone the repo and pull this `testing-closed-shadow-roots` branch
- Run `pnpm i`
- Run `pnpm test` to kick off the tests

To only run the Storybook, run `pnpm start`.

> [!NOTE]
> The tests and snippets in this document rely on `data-testid` attributes being applied to each Web Component we want to interact with and Playwright's `getByTestId()` rather than using the component tag names as the locator selector.
>
> "Testing by test ids is the most resilient way of testing as even if your text or role of the attribute changes, the test will still pass. QA's and developers should define explicit test ids and query them with page.getByTestId()."
>
> [-Playwright docs](https://playwright.dev/docs/locators#locate-by-test-id)

## Important notes about `evaluate()`

In some examples here, we rely on `evaluate()` directly. This is maybe not ideal, but makes sense given the documentation and reasoning for why this is necessary. It's not yet clear to me why the `locator.click()` doesn't work directly for these cases; however, I'll be digging in. For the time being, `evaluate()` should be used until we find out more.

`evaluate()` [does not appear](https://playwright.dev/docs/api/class-locator#locator-evaluate) to be an anti-pattern with Playwright.

> [!TIP]
> Using `evaluate()` might be necessary if:
>
> - The element uses a custom implementation of click, and you want to ensure that specific behavior is triggered.
> - You want to chain or combine other custom actions within the same evaluation.
>
> Calling click via evaluate on a custom element allows you to interact directly with the element's methods and ensures that any custom behavior associated with that element's click method is executed. This approach is particularly useful when dealing with complex web components or custom elements that have overridden or extended behavior on interaction.

## Important notes about `pressSequentially()` over `fill()`

When interacting with our Input and Textarea elements, we must use `pressSequentially()` over `fill()`. It's not clear to me why that is just yet without digging more into the source of Playwright, but for the time being it should be safe to use this instead. I know that `fill()` goes digging into the DOM, trying to find an `<input />` element to fill.

My assumption is `pressSequentially()` works because [it focuses the element, then starts pressing keys](https://playwright.dev/docs/api/class-locator#locator-press-sequentially), which makes sense given the Web Component APIs.

If an Input element is `disabled`, and `pressSequentially()` is called, you get the following:

```bash
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByTestId('input')
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByTestId('input')
  -   locator resolved to <glide-core-input disabled name="name" required="" label="Name" data-testid="input" orientation="horizontal">…</glide-core-input>
  -   unexpected value "hidden"
```

This is nice, because it means `pressSequentially()` has a check to verify it can interact with the element before typing into it, just like `fill()` does. This seems like a worthwhile tradeoff.

## Accordion

Not yet tested.

## Button Group

Not yet tested.

## Button

Button works great with Playwright APIs. You can use the `locator.click()` and `locator.focus()` methods directly.

```html
<glide-core-button data-testid="open-modal"> Open Modal </glide-core-button>
```

```js
const openModalButton = page.getByTestId('open-modal');

await openModalButton.click();
await submitButton.focus();
```

- [Testing link 1](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/e2e.spec.ts#L17)
- [Testing link 2](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/e2e.spec.ts#L41)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/EndToEnd.stories.js)

## Checkbox

Calling `locator.click()` doesn't toggle the state of the Checkbox, even though it works when done in JavaScript. It's a bit unclear why this doesn't work; however, there is a workaround for the time being. One must use `evaluate()` and call `click()` through it.

```html
<glide-core-checkbox label="Label" summary="Summary" data-testid="checkbox">
  <div slot="description">Description</div>
</glide-core-checkbox>
```

```js
const checkbox = page.getByTestId('checkbox');

await checkbox.evaluate((element: HTMLInputElement) => element.click());
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/checkbox.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Checkbox.stories.js)

## Checkbox Group

Similar to [Checkbox](#checkbox) above, `locator.evaluate()` must be used for the time being until we learn more.

```html
<glide-core-checkbox-group label="Label" data-testid="checkbox-group">
  <glide-core-checkbox
    label="One"
    value="one"
    data-testid="option-1"
  ></glide-core-checkbox>
</glide-core-checkbox-group>
```

```js
  const checkboxGroup = page.getByTestId('checkbox-group');
  const checkboxOne = page.getByTestId('option-1');

  await expect(checkboxGroup).toBeVisible();

  await checkboxOne.evaluate((element: HTMLInputElement) => element.click());
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/checkbox-group.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/CheckboxGroup.stories.js)

## Drawer

Drawer works just fine with Playwright APIs.

```html
<glide-core-drawer label="Label" data-testid="drawer">
  <p data-testid="content">Content</p>
</glide-core-drawer>

<glide-core-button data-testid="button">Toggle</glide-core-button>
```

```js
const content = page.getByTestId('content');

await expect(content).toBeVisible();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/drawer.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Drawer.stories.js)

## Dropdown

Dropdown works well with Playwright APIs as well.

With a single-select, using the `click()` methods is all that is needed.

```html
<glide-core-dropdown
  label="Label"
  placeholder="Placeholder"
  data-testid="dropdown"
>
  <glide-core-dropdown-option
    label="One"
    value="one"
    data-testid="option-1"
  ></glide-core-dropdown-option>
</glide-core-dropdown>
```

```js
const dropdown = page.getByTestId('dropdown');
const optionOne = page.getByTestId('option-1');

// Click to open it
await dropdown.click();

// Wait for an option to be visible
await expect(optionOne).toBeVisible();

// Click the option
await optionOne.click();
```

Testing with filtering is straight forward as well. When the Dropdown has more than 10 items, it becomes an input. This means the user can type into the input directly to filter the items.

```js
// Click or focus the dropdown
await dropdown.click();

// Enter text into the input to filter
await dropdown.pressSequentially('Eleven');

//Click the item
await optionEleven.click();
```

- [Testing without filtering link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/dropdown.spec.ts#L3-L34)
- [Testing with filtering link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/dropdown.spec.ts#L36-L67)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Dropdown.stories.js)

## Form Controls Layout

Form Controls Layout is a presentational component only. It works great with Playwright because it doesn't require any interactions.

## Icon Button

Like [Button](#button), Icon Button behaves the same and works just fine with Playwright APIs.

```html
<glide-core-icon-button
  label="Label"
  data-testid="button"
></glide-core-icon-button>
```

```js
const button = page.getByTestId('button');

await button.focus();
await button.click();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/icon-button.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/IconButton.stories.js)

## Input

The Input element works well with Playwright APIs for the most part; however, one must use `pressSequentially()` instead of `fill()` as mentioned [above](#important-notes-about-presssequentially-over-fill).

```html
<glide-core-input label="Name" name="name" data-testid="input" required>
  <div slot="description">Provide a name</div>
</glide-core-input>
```

```js
const input = page.getByTestId('input');

await expect(input).toBeVisible();

// Cannot use `fill()` directly
await input.pressSequentially('Obi-Wan Kenobi');
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/e2e.spec.ts#L8)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/EndToEnd.stories.js)

## Menu

Menu works well with Playwright by using `locator.click()`.

```html
<glide-core-menu>
  <glide-core-button slot="target" data-testid="target"
    >Target</glide-core-button
  >

  <glide-core-menu-options data-testid="menu-options">
    <glide-core-menu-button
      label="One"
      data-testid="option-1"
    ></glide-core-menu-button>
  </glide-core-menu-options>
</glide-core-menu>
```

```js
const target = page.getByTestId('target');
const menuOptions = page.getByTestId('menu-options');
const optionOne = page.getByTestId('option-1');

// Click the target to open the Menu
await target.click();

// Verify Menu Options are now visible
await expect(menuOptions).toBeVisible();
await expect(optionOne).toBeVisible();

// Click an option
await optionOne.click();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/menu.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Menu.stories.js)

## Modal

Modal works well, as it requires interaction from another component to open and close.

In the example links below, the Modal is opened by clicking the target button. After opening the Modal, we verify the contents of the Modal can be interacted with.

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/menu.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/EndToEnd.stories.js)

## Radio Group

Radio Group and Radios works well with Playwright by using `locator.click()`.

```html
<glide-core-radio-group label="Label" data-testid="radio-group">
  <glide-core-radio
    label="One"
    value="one"
    data-testid="one"
  ></glide-core-radio>
</glide-core-radio-group>
```

```js
const group = page.getByTestId('radio-group');
const radioOne = page.getByTestId('one');

await radioOne.click();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/radio.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Radio.stories.js)

## ❌ Split Button

> [!CAUTION]
> Split Button's menu icon button can't be clicked or interacted with directly unfortunately. A `click()` method on the host could help here.

## Tabs

Tabs works well with Playwright by using `locator.click()` and checking visibility of Tab Panels.

```html
<glide-core-tab-group>
  <glide-core-tab slot="nav" panel="1" data-testid="tab-1"
    >Tab 1</glide-core-tab
  >

  <glide-core-tab slot="nav" panel="2" data-testid="tab-2">
    Tab 2
  </glide-core-tab>

  <glide-core-tab-panel name="1" data-testid="panel-1"
    >Panel 1</glide-core-tab-panel
  >
  <glide-core-tab-panel name="2" data-testid="panel-2"
    >Panel 2</glide-core-tab-panel
  >
</glide-core-tab-group>
```

```js
const tabOne = page.getByTestId('tab-1');
const tabTwo = page.getByTestId('tab-2');
const panelOne = page.getByTestId('panel-1');
const panelTwo = page.getByTestId('panel-2');

await expect(tabOne).toBeVisible();
await expect(tabTwo).toBeVisible();

// Tab Panel 1 is active by default,
// the others should be hidden
await expect(panelOne).toBeVisible();
await expect(panelTwo).toBeHidden();

// ...but changing the active Tab
await tabTwo.click();

// ...updates the visible Tab Panel
await expect(panelOne).toBeHidden();
await expect(panelTwo).toBeVisible();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/tabs.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Tabs.stories.js)

## Tag

Tag seems to work just fine with Playwright by reading the text content.

```html
<glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>
```

```js
const tag = page.getByTestId('tag-state');

expect(tag).toHaveText('Clicked');
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/icon-button.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/IconButton.stories.js)

## Textarea

The Textarea element works well with Playwright APIs for the most part; however, one must use `pressSequentially()` instead of `fill()` as mentioned [above](#important-notes-about-presssequentially-over-fill).

```html
<glide-core-textarea label="Name" name="name" data-testid="textarea" required>
  <div slot="description">Provide a name</div>
</glide-core-textarea>
```

```js
const textarea = page.getByTestId('textarea');

await expect(textarea).toBeVisible();

// Cannot use `fill()` directly
await textarea.pressSequentially('Jedi Knight');
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/e2e.spec.ts#L9)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/EndToEnd.stories.js)

## ❌ Toasts

> [!CAUTION]
> Toasts can't be accessed at all, as each toast is in the closed shadow root of `glide-core-toasts`.

- Does it make sense to adjust the component API of
  `glide-core-toasts` so that each toast is somehow in the light DOM or the
  consumer has access?
- Should `glide-core-toasts` open its shadow root since
  it's only a container?
  - Then consumers would have direct access to each
    `glide-core-toast` directly, but each `toast` would have their roots still
    closed.

## Toggle

Calling `locator.click()` doesn't toggle the state of the Toggle, even though it works when done in JavaScript. It's a bit unclear why this doesn't work; however, there is a workaround for the time being. One must use `evaluate()` and call `click()` through it.

```html
<glide-core-toggle label="Label" summary="Summary" data-testid="toggle">
  <div slot="description">Description</div>
</glide-core-toggle>
```

```js
const toggle = page.getByTestId('toggle');

await toggle.evaluate((element: HTMLInputElement) => element.click());
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/toggle.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Toggle.stories.js)

## Tooltip

Tooltip works just fine with Playwright APIs after the target is hovered. Once hovered, the content is then visible and can be verfieid with `toBeVisible()`.

```html
<glide-core-tooltip data-testid="tooltip">
  <p data-testid="content">Content</p>

  <glide-core-button slot="target" data-testid="target"
    >Target</glide-core-button
  >
</glide-core-tooltip>
```

```js
const target = page.getByTestId('target');
const tooltip = page.getByTestId('tooltip');
const content = page.getByTestId('content');

// Target should always be visible
await expect(target).toBeVisible();
// ...but content in Tootip is not
await expect(content).toBeHidden();

// Hover the target to pop the tooltip
await target.hover();

// ...and once the Tooltip is hovered,
// the content is now visible
await expect(tooltip).toBeVisible();
await expect(content).toBeVisible();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/tooltip.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Tooltip.stories.js)

## Tree

Interacting with each `glide-core-tree-item` seems to support `locator.click()`; however, when a `glide-core-tree-item-menu` is involved, things get a bit more complicated. We must first focus the tree item menu component, then call its `click()` method, before interacting with the menu options provided. One can click a menu option directly using `locator.click()`, but the previous steps must rely on `evaluate()`.

```html
<glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>

<glide-core-tree>
  <glide-core-tree-item label="Branch" expanded="">
    <glide-core-tree-item label="Leaf 2" data-testid="leaf-2">
      <glide-core-tree-item-menu
        label="Actions"
        slot="menu"
        placement="bottom-start"
        data-testid="leaf-2-menu"
      >
        <glide-core-menu-button label="Edit" data-testid="edit">
        </glide-core-menu-button>
      </glide-core-tree-item-menu>
    </glide-core-tree-item>
  </glide-core-tree-item>
</glide-core-tree>
```

```js
const treeItem = page.getByTestId('leaf-2');
const treeItemMenu = page.getByTestId('leaf-2-menu');
const treeItemMenuButton = page.getByTestId('edit');

// Must focus a tree item to interact with its menu
await treeItem.evaluate((element) => element.focus());

// After focusing, one can call `click()` on the menu
// to open it
await treeItemMenu.evaluate((element: HTMLButtonElement) => element.click());

// A menu option can then be clicked directly
// using `locator.click()`
await treeItemMenuButton.click();
```

- [Testing link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/tests/tree.spec.ts)
- [Story link](https://github.com/ynotdraw/playwright-visual-regression-testing/blob/testing-closed-shadow-roots/stories/Tree.stories.js)

> [!NOTE]
> Focus puts the three-dot menu in view, but it still seems to have `visbility: hidden` which blocks Playwright from accessing it. It appears `glide-core-tree-item-menu` has `visibility:hidden` no matter the state. So if that element would drop that functionality, we may be able to use `locator.focus()` and `locator.click()` as Playwright can't find the elements as they are not visible.
