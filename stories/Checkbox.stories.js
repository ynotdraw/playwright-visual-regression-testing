import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/checkbox.js';
import { html } from 'lit';

export default {
  title: 'Checkbox',
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
      .querySelector('[data-testid="checkbox"]')
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

      <glide-core-checkbox
        label="Label"
        summary="Summary"
        data-testid="checkbox"
      >
        <div slot="description">Description</div>
      </glide-core-checkbox>
    </div>
  `,
};

export const Primary = {};
