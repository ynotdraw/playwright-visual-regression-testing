import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/button.js';
import '@crowdstrike/glide-core/menu.js';
import '@crowdstrike/glide-core/menu.options.js';
import '@crowdstrike/glide-core/menu.button.js';
import { html } from 'lit';

export default {
  title: 'Menu',
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
      .querySelector('[data-testid="option-3"]')
      .addEventListener('click', () => {
        tag.textContent = 'Clicked';
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

      <glide-core-menu>
        <glide-core-button slot="target" data-testid="target"
          >Target</glide-core-button
        >

        <glide-core-menu-options data-testid="menu-options">
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-button
            label="Three"
            data-testid="option-3"
          ></glide-core-menu-button>
        </glide-core-menu-options>
      </glide-core-menu>
    </div>
  `,
};

export const Primary = {};
