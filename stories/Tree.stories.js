import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/tree.js';
import '@crowdstrike/glide-core/tree.item.js';
import '@crowdstrike/glide-core/tree.item.menu.js';
import '@crowdstrike/glide-core/tree.item.icon-button.js';
import '@crowdstrike/glide-core/menu.button.js';
import { html } from 'lit';

export default {
  title: 'Tree',
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
      .querySelector('[data-testid="edit"]')
      .addEventListener('click', () => {
        tag.textContent = 'Clicked';
      });
  },
  render: () => html`
    <glide-core-tag data-testid="tag-state">Not clicked</glide-core-tag>

    <glide-core-tree>
      <glide-core-tree-item label="Back home" remove-indentation>
      </glide-core-tree-item>

      <glide-core-tree-item label="Branch" expanded="">
        <glide-core-tree-item label="Leaf 1"></glide-core-tree-item>

        <glide-core-tree-item label="Leaf 2" data-testid="leaf-2">
          <glide-core-tree-item-menu
            label="Actions"
            slot="menu"
            placement="bottom-start"
            data-testid="leaf-2-menu"
          >
            <glide-core-menu-button label="Edit" data-testid="edit">
            </glide-core-menu-button>

            <glide-core-menu-button label="Move"> </glide-core-menu-button>

            <glide-core-menu-button label="Share"> </glide-core-menu-button>

            <glide-core-menu-button label="Settings"> </glide-core-menu-button>
          </glide-core-tree-item-menu>
        </glide-core-tree-item>

        <glide-core-tree-item label="Sub-branch">
          <glide-core-tree-item label="Sub-leaf 1"></glide-core-tree-item>
          <glide-core-tree-item label="Sub-leaf 2"></glide-core-tree-item>
          <glide-core-tree-item label="Sub-leaf 3"></glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const Primary = {};
