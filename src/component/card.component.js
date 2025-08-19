import { LitElement, html, css } from 'lit';


/**
 * Main Card Component
 * Container for card-body and card-footer components
 */
export class CardComponent extends LitElement {
  static properties = {
    loading: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      background: #eaeaea;
      border-radius: 16px;
      box-shadow: var(--card-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
      border: 1px solid #d6cfcf;
    }

    :host([loading])::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    :host([loading])::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid var(--card-border-color, #e0e0e0);
      border-top: 2px solid var(--card-primary-color, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 2;
    }

    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    .card-body {
      background: #eaeaea;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      overflow: hidden;
      border: 1px solid #d8cece;
    }

    .card-footer {
      background: #eaeaea;
      padding: 0.5rem
    }

  `;

  constructor() {
    super();
    this.elevation = 1;
    this.loading = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }



  render() {
    return html`
      <div class="card-container">
        <slot name="header"></slot>
        <div class="card-body">
          <slot name="body"></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

// Register custom elements
customElements.define('card-component', CardComponent);

// Export for use in other modules
export default { CardComponent};
