import '@crowdstrike/glide-core/split-container.js';
import '@crowdstrike/glide-core/split-button.js';
import '@crowdstrike/glide-core/menu.js';
import '@crowdstrike/glide-core/menu.button.js';
import '@crowdstrike/glide-core/tag.js';
import { html } from 'lit';

export default {
  title: 'SplitButton',
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
      .querySelector('[data-testid="primary-button"]')
      .addEventListener('click', () => {
        tag.textContent = 'primary button clicked';
      });

    context.canvasElement
      .querySelector('[data-testid="menu-option-3"]')
      .addEventListener('click', () => {
        tag.textContent = 'menu option 3 clicked';
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

      <glide-core-split-container
        menu-label="Label"
        menu-placement="bottom-end"
        variant="primary"
        data-testid="split"
      >
        <glide-core-split-button
          slot="primary-action"
          data-testid="primary-button"
        >
          Button
        </glide-core-split-button>

        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
        <glide-core-menu-button
          label="Three"
          data-testid="menu-option-3"
        ></glide-core-menu-button>
      </glide-core-split-container>
    </div>
  `,
};

export const Primary = {};
