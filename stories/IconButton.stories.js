import '@crowdstrike/glide-core/icon-button.js';
import '@crowdstrike/glide-core/tag.js';
import { html } from 'lit';

export default {
  title: 'Icon Button',
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
      .querySelector('[data-testid="button"]')
      .addEventListener('click', () => {
        tag.textContent = 'Clicked';
      });
  },
  render: () =>
    html` <style>
        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      </style>

      <div class="container">
        <glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>

        <glide-core-icon-button label="Label" data-testid="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M3 12.3h3.3l.8-2.4.8-2.4 1.8 6.75L11.5 21l1.95-9 1.95-9 1 4.65 1 4.65H21"
            ></path>
          </svg>
        </glide-core-icon-button>
      </div>`,
};

export const Primary = {};
