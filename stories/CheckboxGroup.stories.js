import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/checkbox-group.js';
import '@crowdstrike/glide-core/checkbox.js';
import { html } from 'lit';

export default {
  title: 'Checkbox Group',
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
      .querySelector('[data-testid="checkbox-group"]')
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

      <glide-core-checkbox-group label="Label" data-testid="checkbox-group">
        <glide-core-checkbox
          label="One"
          value="one"
          data-testid="option-1"
        ></glide-core-checkbox>
        <glide-core-checkbox
          label="Two"
          value="two"
          data-testid="option-2"
        ></glide-core-checkbox>
        <glide-core-checkbox
          label="Three"
          value="three"
          data-testid="option-3"
        ></glide-core-checkbox>

        <div slot="description">Description</div>
      </glide-core-checkbox-group>
    </div>
  `,
};

export const Primary = {};
