import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/toggle.js';
import { html } from 'lit';

export default {
  title: 'Toggle',
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
      .querySelector('[data-testid="toggle"]')
      .addEventListener('change', (event) => {
        tag.textContent = event.target.checked;
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

      <glide-core-toggle label="Label" summary="Summary" data-testid="toggle">
        <div slot="description">Description</div>
      </glide-core-toggle>
    </div>
  `,
};

export const Primary = {};
