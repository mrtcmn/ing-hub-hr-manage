import { LitElement, html, css } from 'lit';
import './my-element.js';
import './page/employee.page.js';
import './component/navbar.component.js';
import { Router } from '@vaadin/router';
import { setLocale } from './locales/en.js';
import { setMessages, getMessage } from './utils/localization.js';
import { messages as enMessages } from './locales/en.js';
import './component/locale-picker.component.js';

class RootElement extends LitElement {

    constructor() {
        super();
        this.currentLocale = 'en';
        this.setupLocalization();
    }

    async setupLocalization() {
        // Set initial messages
        setMessages(enMessages);
        
        // Try to get locale from html lang attribute or default to 'en'
        const savedLocale = document.documentElement.lang || 'en';
        await this.changeLocale(savedLocale);
    }

    async changeLocale(event) {
        if (event?.detail?.locale) {
            return;
        }
        const locale = event?.detail?.locale
        try {
            if (locale === 'en') {
                setMessages(enMessages);
            } else {
                const { messages } = await import(`./locales/${locale}.js`);
                setMessages(messages);
            }
            
            await setLocale(locale);
            this.currentLocale = locale;
            localStorage.setItem('locale', locale);
            this.requestUpdate();
        } catch (error) {
            console.error('Failed to load locale:', error);
            // Fallback to English
            setMessages(enMessages);
            this.currentLocale = 'en';
        }
    }

    firstUpdated() {
        const router = new Router(this.shadowRoot.querySelector('#outlet'));
        router.setRoutes([
            { path: '/', component: 'employee-page' },
            { path: '/users', component: 'x-user-list' }
        ]);
    }

    static styles = css`
        .logo-container {
            display: flex;
            align-items: center;
            gap: 10px;

            span {
                font-size: 16px;
                font-weight: 600;
                color: #000000;
            }

             .logo {
            border-radius: 4px;
        }
        }

        .locale-switcher {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: auto;
        }

        .locale-btn {
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
        }

        .locale-btn:hover {
            background: #f5f5f5;
        }

        .locale-btn.active {
            background: #007bff;
            color: white;
            border-color: #007bff;
        }
    `;

    render() {
        return html`<div>
            <navbar-component>
                <section class="logo-container">
                    <img src="public/logo.jpg" alt="Logo" class="logo" width="32" height="32">
                    <span>ING</span>
                </section>
                <a href="/">${getMessage('home')}</a>
                <a href="/users">${getMessage('users')}</a>
                
               <locale-picker @locale-changed=${this.changeLocale} currentLocale=${this.currentLocale} />
            </navbar-component>
            <div id="outlet"></div>
        </div>`;
    }
}

customElements.define('root-element', RootElement);