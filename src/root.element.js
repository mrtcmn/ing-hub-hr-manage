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
        await this.changeLocale({
            detail: {
                locale: savedLocale
            }
        });
    }

    async changeLocale(event) {
        if (!event?.detail?.locale) {
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
            { path: '/users', component: 'x-user-list' },
            { path: '/users/:userId', component: 'x-user-detail' }
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

        .nav-links {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 14px;
            margin-right: 20px;
        }

        .nav-links a {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: #ff6303;
            opacity: 0.8;
        }

        .nav-links a:hover {
            color: #ff6303;
        }

        .nav-links a.active {
            color: #ff6303;
        }

        .nav-links a svg {
            width: 16px;
            height: 16px;
        }

        .nav-links a span {
            display: inline;
        }

        .grow {
            flex-grow: 1;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {


            .nav-links {
                gap: 15px;
                margin-right: 15px;
            }

            .nav-links a span {
                display: none;
            }

            .nav-links a svg {
                width: 20px;
                height: 20px;
            }

            .locale-switcher {
                margin-left: 10px;
            }
        }

        @media (max-width: 480px) {
            .nav-links {
                gap: 10px;
                margin-right: 10px;
            }

            .nav-links a svg {
                width: 18px;
                height: 18px;
            }

            .locale-switcher {
                margin-left: 5px;
            }
        }
    `;

    render() {
        return html`
            <div>
                <navbar-component>
                    <section class="logo-container">
                        <img src="public/logo.jpg" alt="Logo" class="logo" width="32" height="32">
                        <span>ING</span>
                    </section>
                    <div class="grow"></div>
                    <section class="nav-links">
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                            <span>${getMessage('employee_list')}</span>
                        </a>
                        <a href="/users/new">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus-icon lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
                            <span>${getMessage('add_employee')}</span>
                        </a>
                    </section>
                   <locale-picker @locale-changed=${this.changeLocale} currentLocale=${this.currentLocale} />
                </navbar-component>
                <div id="outlet"></div>
            </div>`;
    }
}

customElements.define('root-element', RootElement);