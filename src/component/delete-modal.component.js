import { LitElement, html, css } from 'lit';
import '../component/card.component.js';
import store from '../store/employee.store.js';

export class DeleteModalComponent extends LitElement {
  static properties = {
    isOpen: { type: Boolean, reflect: true },
    employeeName: { type: String },
    employeeId: { type: String },
    isLoadingOnProceed: { type: Boolean },
    employeeStore: { type: Object }
  };

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    :host([isOpen]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }

    .modal-container {
      position: relative;
      z-index: 1001;
      max-width: 400px;
      width: 90%;
      margin: 20px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background: white;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ff6303;
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-button:hover {
      background-color: rgba(255, 99, 3, 0.1);
    }

    .close-icon {
      width: 20px;
      height: 20px;
      color: #ff6303;
    }

    .modal-message {
      padding: 20px;
      color: #333;
      line-height: 1.5;
      text-align: center;
      background: white;
    }

    .modal-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 12px;
    }

    .proceed-button {
      background: #ff6303;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .proceed-button:hover {
      background: #e55a00;
    }

    .cancel-button {
      background: white;
      color: #6c5ce7;
      border: 1px solid #6c5ce7;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .cancel-button:hover {
      background: #6c5ce7;
      color: white;
    }

    /* Animation for modal appearance */
    .modal-container {
      animation: modalSlideIn 0.3s ease-out;
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Mobile responsive */
    @media (max-width: 480px) {
      .modal-container {
        width: 95%;
        margin: 10px;
      }
      
      .modal-header {
        padding: 15px 15px 0 15px;
      }
      
      .modal-message {
        padding: 15px;
      }
      
      .modal-actions {
        padding: 0 15px 15px 15px;
      }
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
    this.employeeName = '';
    this.employeeId = '';
    this.isLoadingOnProceed = false;
    this.employeeStore = store.getState()
  }


  open(employeeName, employeeId) {
    console.log('DeleteModal open method called with:', employeeName, employeeId);
    this.employeeName = employeeName;
    this.employeeId = employeeId;
    this.isOpen = true;
    console.log('isOpen set to:', this.isOpen);
    document.body.style.overflow = 'hidden';
  }

  close() {
    console.log("close");
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  handleProceed() {

    this.isLoadingOnProceed = true;
    setTimeout(() => {
      this.employeeStore.removeEmployee(this.employeeId);
      this.isLoadingOnProceed = false;
      this.dispatchEvent(new CustomEvent('deleteConfirmed', {
        detail: { employeeId: this.employeeId },
        bubbles: true,
        composed: true
      }));
      this.close();
    }, 2000);
  }

  handleCancel() {
    this.close();
  }

  handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  render() {
    if (!this.isOpen) return html``;

    return html`
      <div class="modal-overlay" @click=${this.handleOverlayClick}></div>
      <div class="modal-container">
        <card-component background="white">
          <div slot="header" class="modal-header">
            <h2 class="modal-title">Are you sure?</h2>
            <button 
              class="close-button" 
              @click=${this.close}
              title="Close">
              <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div slot="body" class="modal-message">
            Selected Employee record of <strong>${this.employeeName}</strong> will be deleted.
          </div>
          
          <div slot="footer" class="modal-actions">
            <app-button label="Cancel" @click=${this.handleCancel}></app-button>
            <app-button label="Proceed" @click=${this.handleProceed} variant="secondary" ?loading=${this.isLoadingOnProceed}></app-button>
          
          </div>
        </card-component>
      </div>
    `;
  }
}

// Register custom element
customElements.define('delete-modal', DeleteModalComponent);

// Export for use in other modules
export default { DeleteModalComponent };
