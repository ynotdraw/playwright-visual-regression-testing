import '@crowdstrike/glide-core/button.js';
import '@crowdstrike/glide-core/tooltip.js';
import { html } from 'lit';

export default {
  title: 'Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play() {},
  render: () => html`
    <glide-core-tooltip data-testid="tooltip">
      Tooltip
      <kbd data-testid="kbd">CMD + K</kbd>

      <glide-core-button slot="target" data-testid="target"
        >Target</glide-core-button
      >
    </glide-core-tooltip>
  `,
};

export const Primary = {};
