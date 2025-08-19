import { LitElement, html, css } from 'lit';
import { SUPPORTED_LANUGAGES } from '../constant/language'
import { ref, createRef } from 'lit/directives/ref.js';

export class LocalePickerComponent extends LitElement {
    static properties = {
        currentLocale: { type: String },
        isDropdownOpen: { type: Boolean }
    };

    constructor() {
        super();
        this.currentLocale = SUPPORTED_LANUGAGES[0];
        this.isDropdownOpen = false;
        this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleClickOutside);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleClickOutside);
    }

    drowdownPickerRef = createRef();
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: auto;
        }

        .locale__btn {
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
        }

        .locale__btn:hover {
            background: #f5f5f5;
        }

        .locale__btn.active {
            background: #007bff;
            color: white;
            border-color: #007bff;
        }

        .locale__picker {
            position: relative;
            display: inline-block;

            .locale__options {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 4px;
                z-index: 1000;
            }
        }

      
    `;

    _handleLocaleChange(locale) {
        this.currentLocale = locale;
        this.dispatchEvent(new CustomEvent('locale-changed', {
            detail: { locale },
            bubbles: true,
            composed: true
        }));
    }

    _dropdownToggle() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    _handleClickOutside(event) {
        if (this.isDropdownOpen && !event.composedPath().includes(this)) {
            this.isDropdownOpen = false;
        }
    }

    render() {
        return html`
        <div class="locale__picker"  ${ref(this.drowdownPickerRef)}>
            <div class="locale__trigger" @click=${this._dropdownToggle}>
                <img src="public/flags/${this.currentLocale}.svg" alt="${this.currentLocale}" width="20" height="20">
            </div>
            <div class="locale__options" ?hidden=${!this.isDropdownOpen}>
            ${SUPPORTED_LANUGAGES.map(locale => html`
                <button 
                    class="locale__btn ${this.currentLocale === locale ? 'active' : ''}"
                    @click=${() => this._handleLocaleChange(locale)}
                >
                    <img src="public/flags/${locale}.svg" alt="${locale}" width="20" height="20">
                    <span>${locale.toUpperCase()}</span>
                </button>
            `)}
            </div>
        </div>
        `;
    }
}

customElements.define('locale-picker', LocalePickerComponent);
