import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/button.js';
import '@crowdstrike/glide-core/toasts.js';
import { html } from 'lit';

export default {
  title: 'Toasts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const toasts = context.canvasElement.querySelector('glide-core-toasts');

    context.canvasElement
      .querySelector('[data-testid="button"]')
      .addEventListener('click', (event) => {
        toasts.add({
          variant: 'success',
          label: 'Success',
          description: 'Test toast',
          duration: Infinity,
        });
      });
  },
  render: () => html`
    <glide-core-toasts></glide-core-toasts>

    <glide-core-button data-testid="button">Trigger</glide-core-button>
  `,
};

export const Primary = {};
