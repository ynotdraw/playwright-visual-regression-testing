import '@crowdstrike/glide-core/button.js';
import '@crowdstrike/glide-core/drawer.js';
import { html } from 'lit';

export default {
  title: 'Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    let isOpen = false;

    const drawer = context.canvasElement.querySelector(
      '[data-testid="drawer"]',
    );

    context.canvasElement
      .querySelector('[data-testid="button"]')
      .addEventListener('click', () => {
        if (isOpen) {
          drawer.close();
          isOpen = false;
        } else {
          drawer.open();
          isOpen = true;
        }
      });
  },
  render: () => html`
    <glide-core-drawer label="Label" data-testid="drawer">
      <p data-testid="content">Content</p>
    </glide-core-drawer>

    <glide-core-button data-testid="button">Toggle</glide-core-button>
  `,
};

export const Primary = {};
