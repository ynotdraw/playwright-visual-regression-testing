import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/dropdown.js';
import '@crowdstrike/glide-core/dropdown.option.js';
import { html } from 'lit';

export default {
  title: 'Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const tag = context.canvasElement.querySelector(
      '[data-testid="tag-state"]',
    );

    context.canvasElement
      .querySelector('[data-testid="dropdown"]')
      .addEventListener('change', (event) => {
        tag.textContent = event.target.value;
      });
  },
  render: () => html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    </style>

    <div class="container">
      <glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>

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

        <glide-core-dropdown-option
          label="Two"
          value="two"
          data-testid="option-2"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Three"
          value="three"
          data-testid="option-3"
        ></glide-core-dropdown-option>

        <div slot="description">Description</div>
      </glide-core-dropdown>
    </div>
  `,
};

export const Primary = {};

export const Filterable = {
  render: () => html`
    <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    </style>

    <div class="container">
      <glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>

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

        <glide-core-dropdown-option
          label="Two"
          value="two"
          data-testid="option-2"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Three"
          value="three"
          data-testid="option-3"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Four"
          value="four"
          data-testid="option-4"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Five"
          value="five"
          data-testid="option-5"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Six"
          value="six"
          data-testid="option-6"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Seven"
          value="seven"
          data-testid="option-7"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eight"
          value="eight"
          data-testid="option-8"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Nine"
          value="nine"
          data-testid="option-9"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Ten"
          value="ten"
          data-testid="option-10"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eleven"
          value="eleven"
          data-testid="option-11"
        ></glide-core-dropdown-option>

        <div slot="description">Description</div>
      </glide-core-dropdown>
    </div>
  `,
};
