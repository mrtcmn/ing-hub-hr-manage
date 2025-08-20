import { LitElement, html, css } from 'lit';
import { getMessage } from '../utils/localization.js';

export class BaseInput extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        --input-background: #ffffff;
        --input-border-color: #e2e8f0;
        --input-border-radius: 8px;
        --input-border-width: 1px;
        --input-padding: 12px 16px;
        --input-font-size: 14px;
        --input-font-family: 'Geist', sans-serif;
        --input-color: #1a202c;
        --input-focus-border-color: #3b82f6;
        --input-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        --input-disabled-background: #f7fafc;
        --input-disabled-color: #a0aec0;
        --input-error-border-color: #e35f5fd7;
        --input-error-background: #fed7d7;
        --input-transition: all 0.2s ease-in-out;
      }

      .input-wrapper {
        position: relative;
        width: 100%;
      }

      .input-field {
        width: 100%;
        box-sizing: border-box;
        background: var(--input-background);
        border: var(--input-border-width) solid var(--input-border-color);
        border-radius: var(--input-border-radius);
        padding: var(--input-padding);
        font-size: var(--input-font-size);
        font-family: var(--input-font-family);
        color: var(--input-color);
        transition: var(--input-transition);
        outline: none;
      }

      .input-field:focus {
        border-color: var(--input-focus-border-color);
        box-shadow: var(--input-focus-shadow);
      }

      .input-field:disabled {
        background: var(--input-disabled-background);
        color: var(--input-disabled-color);
        cursor: not-allowed;
      }

      .input-field.error {
        border-color: var(--input-error-border-color);
        background: var(--input-error-background);
      }

      .input-label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 500;
        color: var(--input-color);
      }

      .input-error-message {
        margin-top: 4px;
        font-size: 12px;
        color: var(--input-error-border-color);
      }

      .input-required {
        color: #e53e3e;
        margin-left: 4px;
      }
    `;
    }

    static get properties() {
        return {
            label: { type: String },
            placeholder: { type: String },
            value: { type: String },
            disabled: { type: Boolean },
            required: { type: Boolean },
            error: { type: String },
            name: { type: String }
        };
    }

    constructor() {
        super();
        this.label = '';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.required = false;
        this.error = '';
        this.name = '';
    }

    render() {
        return html`
      <div class="input-wrapper">
        ${this.label ? html`
          <label class="input-label">
            ${this.label}
            ${this.required ? html`<span class="input-required">*</span>` : ''}
          </label>
        ` : ''}
        
        <slot></slot>
        
        ${this.error ? html`
          <div class="input-error-message">${this.error}</div>
        ` : ''}
      </div>
    `;
    }
}

customElements.define('base-input', BaseInput);


export class TextInput extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        --text-input-background: #ffffff;
        --text-input-border-color: #e2e8f0;
        --text-input-border-radius: 8px;
        --text-input-border-width: 1px;
        --text-input-padding: 12px 16px;
        --text-input-font-size: 14px;
        --text-input-font-family: 'Geist', sans-serif;
        --text-input-color: #1a202c;
        --text-input-focus-border-color: #3b82f6;
        --text-input-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        --text-input-disabled-background: #f7fafc;
        --text-input-disabled-color: #a0aec0;
        --text-input-error-border-color: #e53e3e;
        --text-input-error-background: #f9ebeb;
        --text-input-transition: all 0.2s ease-in-out;
      }

      .text-input {
        width: 100%;
        box-sizing: border-box;
        background: var(--text-input-background);
        border: var(--text-input-border-width) solid var(--text-input-border-color);
        border-radius: var(--text-input-border-radius);
        padding: var(--text-input-padding);
        font-size: var(--text-input-font-size);
        font-family: var(--text-input-font-family);
        color: var(--text-input-color);
        transition: var(--text-input-transition);
        outline: none;
      }

      .text-input:focus {
        border-color: var(--text-input-focus-border-color);
        box-shadow: var(--text-input-focus-shadow);
      }

      .text-input:disabled {
        background: var(--text-input-disabled-background);
        color: var(--text-input-disabled-color);
        cursor: not-allowed;
      }

      .text-input.error {
        border-color: var(--text-input-error-border-color);
        background: var(--text-input-error-background);
      }

      .text-input::placeholder {
        color: #a0aec0;
      }
    `;
    }

    static get properties() {
        return {
            label: { type: String },
            placeholder: { type: String },
            value: { type: String },
            disabled: { type: Boolean },
            required: { type: Boolean },
            error: { type: String },
            name: { type: String },
            type: { type: String },
            maxlength: { type: Number },
            minlength: { type: Number }
        };
    }

    constructor() {
        super();
        this.label = '';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.required = false;
        this.error = '';
        this.name = '';
        this.type = 'text';
        this.maxlength = null;
        this.minlength = null;
    }

    render() {
        return html`
      <base-input
        .label=${this.label}
        .required=${this.required}
        .error=${this.error}
        .name=${this.name}
      >
        <input
          class="text-input ${this.error ? 'error' : ''}"
          type="${this.type}"
          placeholder="${this.placeholder}"
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name="${this.name}"
          maxlength="${this.maxlength || ''}"
          minlength="${this.minlength || ''}"
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
      </base-input>
    `;
    }

    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    _handleChange(e) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('text-input', TextInput);

export class Dropdown extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        --dropdown-background: #ffffff;
        --dropdown-border-color: #e2e8f0;
        --dropdown-border-radius: 8px;
        --dropdown-border-width: 1px;
        --dropdown-padding: 12px 16px;
        --dropdown-font-size: 14px;
        --dropdown-font-family: 'Geist', sans-serif;
        --dropdown-color: #1a202c;
        --dropdown-focus-border-color: #3b82f6;
        --dropdown-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        --dropdown-disabled-background: #f7fafc;
        --dropdown-disabled-color: #a0aec0;
        --dropdown-error-border-color: #e53e3e;
        --dropdown-error-background: #fed7d7;
        --dropdown-transition: all 0.2s ease-in-out;
        --dropdown-arrow-color: #a0aec0;
        --dropdown-hover-background: #f8fafc;
      }

      .dropdown-wrapper {
        position: relative;
        width: 100%;
      }

      .dropdown-select {
        width: 100%;
        box-sizing: border-box;
        background: var(--dropdown-background);
        border: var(--dropdown-border-width) solid var(--dropdown-border-color);
        border-radius: var(--dropdown-border-radius);
        padding: var(--dropdown-padding);
        font-size: var(--dropdown-font-size);
        font-family: var(--dropdown-font-family);
        color: var(--dropdown-color);
        transition: var(--dropdown-transition);
        outline: none;
        appearance: none;
        cursor: pointer;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        padding-right: 40px;
      }

      .dropdown-select:focus {
        border-color: var(--dropdown-focus-border-color);
        box-shadow: var(--dropdown-focus-shadow);
      }

      .dropdown-select:hover:not(:disabled) {
        background-color: var(--dropdown-hover-background);
      }

      .dropdown-select:disabled {
        background: var(--dropdown-disabled-background);
        color: var(--dropdown-disabled-color);
        cursor: not-allowed;
      }

      .dropdown-select.error {
        border-color: var(--dropdown-error-border-color);
        background: var(--dropdown-error-background);
      }

      .dropdown-option {
        padding: 8px 16px;
        background: var(--dropdown-background);
        color: var(--dropdown-color);
      }

      .dropdown-option:hover {
        background: var(--dropdown-hover-background);
      }

      .dropdown-option:disabled {
        color: var(--dropdown-disabled-color);
        cursor: not-allowed;
      }

      .dropdown-select option[value=""] {
        color: #a0aec0;
        font-style: italic;
      }
    `;
    }

    static get properties() {
        return {
            label: { type: String },
            value: { type: String },
            disabled: { type: Boolean },
            required: { type: Boolean },
            error: { type: String },
            name: { type: String },
            options: { type: Array }
        };
    }

    constructor() {
        super();
        this.label = '';
        this.value = '';
        this.disabled = false;
        this.required = false;
        this.error = '';
        this.name = '';
        this.options = [];
    }

    render() {
        return html`
      <base-input
        .label=${this.label}
        .required=${this.required}
        .error=${this.error}
        .name=${this.name}
      >
        <select
          class="dropdown-select ${this.error ? 'error' : ''}"
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name="${this.name}"
          @change=${this._handleChange}
        >
          <option value="" disabled ${!this.value ? 'selected' : ''}>Please select</option>
          ${this.options?.map(option => html`
            <option 
              class="dropdown-option"
              value="${option.value}" 
              ?disabled=${option.disabled}
              ?selected=${option.value === this.value}
            >
              ${option.label}
            </option>
          `)}
        </select>
      </base-input>
    `;
    }

    _handleChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('input-dropdown', Dropdown);

export class Button extends LitElement {
    static get styles() {
        return css`
      :host {
        display: inline-block;
        --button-background: transparent;
        --button-border-color: #404040;
        --button-border-radius: 12px;
        --button-border-width: 1px;
        --button-padding: 5px 10px;
        --button-font-size: 14px;
        --button-font-weight: 500;
        --button-color: #404040;
        --button-hover-background: rgba(59, 130, 246, 0.05);
        --button-hover-border-color: #404040;
        --button-hover-color: #404040;
        --button-disabled-background: #f7fafc;
        --button-disabled-border-color: #e2e8f0;
        --button-disabled-color: #a0aec0;
        --button-loading-color: #a0aec0;
        --button-transition: all 0.2s ease-in-out;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;
        background: var(--button-background);
        border: var(--button-border-width) solid var(--button-border-color);
        border-radius: var(--button-border-radius);
        padding: var(--button-padding);
        font-size: var(--button-font-size);
        font-family: var(--button-font-family);
        font-weight: var(--button-font-weight);
        color: var(--button-color);
        text-decoration: none;
        cursor: pointer;
        transition: var(--button-transition);
        outline: none;
        user-select: none;
        white-space: nowrap;

        &.secondary {
          border-color: #ff6303;
          color: #ff6303;
        }

        &.secondary:hover {
          background: #ff6303 !important;
          color: white !important;
          border-color: #ff6303 !important;
        }
      }

      .button:hover:not(:disabled):not(.loading) {
        background: var(--button-hover-background);
        border-color: var(--button-hover-border-color);
        color: var(--button-hover-color);
      }

      .button:active:not(:disabled):not(.loading) {
        transform: translateY(1px);
      }

      .button:disabled,
      .button.loading {
        background: var(--button-disabled-background);
        border-color: var(--button-disabled-border-color);
        color: var(--button-disabled-color);
        cursor: not-allowed;
        transform: none;
      }

      .button.loading {
        color: var(--button-loading-color);
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .button-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `;
    }

    static get properties() {
        return {
            label: { type: String },
            disabled: { type: Boolean },
            loading: { type: Boolean },
            type: { type: String },
            variant: { type: String }
        };
    }

    constructor() {
        super();
        this.label = getMessage('button');
        this.disabled = false;
        this.loading = false;
        this.type = 'button';
        this.variant = 'primary';
    }

    render() {
        return html`
      <button
        class="button ${this.loading ? 'loading' : ''} ${this.variant}"
        type="${this.type}"
        ?disabled=${this.disabled || this.loading}
        @click=${this._handleClick}
      >
        <div class="button-content">
          <slot name="icon"></slot>
          ${this.loading ? html`<div class="spinner"></div>` : ''}
          <span>${this.label}</span>
        </div>
      </button>
    `;
    }

    _handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            return;
        }

        this.dispatchEvent(new CustomEvent('click', {
            detail: { event: e },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('app-button', Button);