import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/tab.group.js';
import '@crowdstrike/glide-core/tab.panel.js';
import '@crowdstrike/glide-core/tab.js';
import { html } from 'lit';

export default {
  title: 'Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {},
  render: () => html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1" data-testid="tab-1"
        >Tab 1</glide-core-tab
      >

      <glide-core-tab slot="nav" panel="2" data-testid="tab-2">
        Tab 2
      </glide-core-tab>

      <glide-core-tab-panel name="1" data-testid="panel-1"
        >Panel 1</glide-core-tab-panel
      >
      <glide-core-tab-panel name="2" data-testid="panel-2"
        >Panel 2</glide-core-tab-panel
      >
    </glide-core-tab-group>
  `,
};

export const Primary = {};
