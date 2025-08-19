import { LitElement, html, css } from 'lit';

export class NavbarComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #ffffff;
      color: #333;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    nav {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a {
      color: #333;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.2s;
      font-weight: 500;
    }

    a:hover, a:focus {
      background-color: #f8f9fa;
      color: #007bff;
      outline: none;
    }

    a:active {
      background-color: #e9ecef;
    }

    /* Mobile responsive styles */
    @media (max-width: 768px) {
      :host {
        padding: 10px 15px;
      }
    }

    @media (max-width: 480px) {
      :host {
        padding: 8px 10px;
      }
    }

    /* Your provided styles */
    .someclass { 
      border: 1px solid red; 
      padding: 4px; 
    }
    
    .anotherclass { 
      background-color: navy; 
    }
  `;

  render() {
    return html`
      <nav role="navigation" aria-label="Main navigation">
        <slot></slot>
      </nav>
    `;
  }
}

customElements.define('navbar-component', NavbarComponent);
