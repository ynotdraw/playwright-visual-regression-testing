import '@crowdstrike/glide-core/button.js';
import '@crowdstrike/glide-core/form-controls-layout.js';
import '@crowdstrike/glide-core/input.js';
import '@crowdstrike/glide-core/modal.js';
import '@crowdstrike/glide-core/tag.js';
import '@crowdstrike/glide-core/textarea.js';
import { html } from 'lit';

export default {
  title: 'E2E',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    // Element references
    const openButton = context.canvasElement.querySelector(
      '[data-testid="open-modal"]',
    );
    const tag = context.canvasElement.querySelector(
      '[data-testid="tag-state"]',
    );
    const modal = context.canvasElement.querySelector('glide-core-modal');
    const form = context.canvasElement.querySelector('form');
    const modalCancel = context.canvasElement.querySelector(
      '[data-testid="modal-cancel"]',
    );

    // Button event handlers
    openButton.addEventListener('click', () => {
      modal.showModal();
    });
    modalCancel.addEventListener('click', () => {
      form.reset();
      modal.close();
    });

    // Form submission
    context.canvasElement
      .querySelector('form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        tag.textContent = `${formData.get('name')}|${formData.get('description')}`;

        modal.close();
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
      <glide-core-button data-testid="open-modal">
        Open Modal
      </glide-core-button>

      <glide-core-tag data-testid="tag-state">Not submitted</glide-core-tag>
    </div>

    <glide-core-modal label="Information" data-testid="modal">
      <form id="test-form">
        <glide-core-form-controls-layout>
          <glide-core-input
            label="Name"
            name="name"
            data-testid="input"
            required
          >
            <div slot="description">Provide a name</div>
          </glide-core-input>

          <glide-core-textarea
            label="Description"
            name="description"
            data-testid="textarea"
          >
            <div slot="description">Provide a description (optional)</div>
          </glide-core-textarea>
        </glide-core-form-controls-layout>
      </form>

      <glide-core-button
        data-testid="modal-cancel"
        slot="secondary"
        variant="tertiary"
      >
        Cancel
      </glide-core-button>

      <glide-core-button
        data-testid="modal-submit"
        form="test-form"
        slot="primary"
        type="submit"
        >Submit</glide-core-button
      >
    </glide-core-modal>
  `,
};

export const Primary = {};
