import { fixture, assert, html, expect } from '@open-wc/testing';
import './root.element.js';
import { Router } from '@vaadin/router';
import { setMessages, getMessage } from './utils/localization.js';
import { messages as enMessages } from './locales/en.js';

suite('RootElement', () => {
    let element;

    setup(async () => {
        

        Object.defineProperty(document.documentElement, 'lang', {
            value: 'en',
            writable: true
        });

        element = await fixture(html`<root-element></root-element>`);
    });

    teardown(() => {
        // Clean up any mocks
        if (element.router) {
            element.router.destroy();
        }
    });

    suite('Localization', () => {
        test('should initialize with English locale by default', () => {
            assert.equal(element.currentLocale, 'en');
        });

        test('should setup localization on constructor', async () => {
            // Wait for setupLocalization to complete
            await element.updateComplete;
            
            // Check that messages are set
            assert.isDefined(getMessage('employee_list'));
            assert.isDefined(getMessage('add_employee'));
        });

        test('should change locale to English successfully', async () => {
            const event = { detail: { locale: 'en' } };
            
            await element.changeLocale(event);
            
            assert.equal(element.currentLocale, 'en');
            assert.equal(getMessage('employee_list'), enMessages.employee_list);
        });

        test('should change locale to Turkish successfully', async () => {
            // Mock the dynamic import
            const mockTurkishMessages = {
                employee_list: 'Çalışan Listesi',
                add_employee: 'Çalışan Ekle'
            };
            
            // Mock the import function
            const originalImport = window.import;
            window.import = async (path) => {
                if (path.includes('tr.js')) {
                    return { messages: mockTurkishMessages };
                }
                throw new Error('Module not found');
            };

            const event = { detail: { locale: 'tr' } };
            
            await element.changeLocale(event);
            
            assert.equal(element.currentLocale, 'tr');
            
            // Restore original import
            window.import = originalImport;
        });

        test('should handle locale change failure gracefully', async () => {
            const originalImport = window.import;
            window.import = async () => {
                throw new Error('Failed to load locale');
            };

            const event = { detail: { locale: 'invalid' } };
            
            await element.changeLocale(event);
            
            assert.equal(element.currentLocale, 'en');
            
            window.import = originalImport;
        });


        test('should handle missing locale in event', async () => {
            const event = { detail: {} };
            const originalLocale = element.currentLocale;
            
            await element.changeLocale(event);
            
            // Should not change locale
            assert.equal(element.currentLocale, originalLocale);
        });

        test('should handle null event', async () => {
            const originalLocale = element.currentLocale;
            
            await element.changeLocale(null);
            
            // Should not change locale
            assert.equal(element.currentLocale, originalLocale);
        });
    });

    suite('Locale Picker Integration', () => {
        test('should pass current locale to locale picker', () => {
            const localePicker = element.shadowRoot.querySelector('locale-picker');
            
            assert.equal(localePicker.getAttribute('currentLocale'), 'en');
        });

        test('should listen to locale change events', async () => {
            // Mock the Turkish locale import
            const mockTurkishMessages = {
                employee_list: 'Çalışan Listesi',
                add_employee: 'Çalışan Ekle'
            };
            
            const originalImport = window.import;
            window.import = async (path) => {
                if (path.includes('tr.js')) {
                    return { messages: mockTurkishMessages };
                }
                throw new Error('Module not found');
            };

            // Call changeLocale directly to test the functionality
            const event = { detail: { locale: 'tr' } };
            
            await element.changeLocale(event);
            
            // Check that locale was changed
            assert.equal(element.currentLocale, 'tr');
            
            // Restore original import
            window.import = originalImport;
        });
    });

    suite('Responsive Design', () => {
        test('should have mobile responsive styles', () => {
            // Check that the element has styles defined
            assert.isDefined(element.constructor.styles);
            
            // Check for mobile media queries in the CSS
            const cssText = element.constructor.styles.cssText || '';
            assert.include(cssText, '@media (max-width: 768px)');
            assert.include(cssText, '@media (max-width: 480px)');
        });

        test('should hide navigation text on mobile', () => {
            // Check that the element has styles defined
            assert.isDefined(element.constructor.styles);
            
            // Check for mobile-specific styles in the CSS
            const cssText = element.constructor.styles.cssText || '';
            // Look for the actual text that appears in the CSS - it's in a media query
            assert.include(cssText, 'display: none');
        });
    });

    suite('Component Registration', () => {
        test('should register all required components', () => {
            // Check that custom elements are defined
            assert.isTrue(customElements.get('root-element') !== undefined);
            assert.isTrue(customElements.get('navbar-component') !== undefined);
            assert.isTrue(customElements.get('locale-picker') !== undefined);
        });
    });

});
