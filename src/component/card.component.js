import { LitElement, html, css, unsafeCSS } from 'lit';


/**
 * Main Card Component
 * Container for card-body and card-footer components
 */
export class CardComponent extends LitElement {
  static properties = {
    loading: { type: Boolean, reflect: true },
    background: { type: String, reflect: true },
    bodyHidden: { type: Boolean, reflect: true },
    statusOfBottomBar: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      background: #f9f9f9d9;
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

    .card-container {
        background: ${unsafeCSS(this.background ?? 'inherit')};
    }

    .card-container.success {
      background: #ebfae8d9;
    }

    .card-container.error {
      background: #fbeced;
    }

    .card-body {
      background: #f9f9f9d9;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      overflow: hidden;
      border-bottom: 1px solid #d8cece;
    }

    /* Mobile responsive styles */
    @media (max-width: 768px) {
      .card-body {
        overflow-x: auto;
        overflow-y: hidden;
      }
    }

    .card-footer {
      background: #f9f9f9d9;
      padding: 0.5rem;

      transition: background 0.8s ease;
    }

    .card-footer.success {
      background: #ebfae8d9;
    }

    .card-footer.error {
      background: #fbeced;
    }

  `;

  constructor() {
    super();
    this.loading = false;
    this.bodyHidden = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }



  render() {
    return html`
      <div class="card-container ${this.statusOfBottomBar}">
        <slot name="header"></slot>
        <div class="card-body" ?hidden=${this.bodyHidden}>
          <slot name="body"></slot>
        </div>
        <div class=${"card-footer " + this.statusOfBottomBar}>
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
