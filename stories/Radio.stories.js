import '@crowdstrike/glide-core/radio-group.js';
import '@crowdstrike/glide-core/radio.js';
import '@crowdstrike/glide-core/tag.js';
import { html } from 'lit';

export default {
  title: 'Radio',
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
      .querySelector('[data-testid="radio-group"]')
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

      <glide-core-radio-group label="Label" data-testid="radio-group">
        <glide-core-radio
          label="One"
          value="one"
          data-testid="one"
          checked
        ></glide-core-radio>
        <glide-core-radio
          label="Two"
          value="two"
          data-testid="two"
        ></glide-core-radio>
        <glide-core-radio
          label="Three"
          value="three"
          data-testid="three"
        ></glide-core-radio>

        <div slot="description">Description</div>
      </glide-core-radio-group>
    </div>
  `,
};

export const Primary = {};
