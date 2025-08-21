import { fixture, assert, html, expect } from '@open-wc/testing';
import { BaseInput, TextInput, Dropdown, Button } from './input.component.js';

suite('BaseInput Component', () => {
    let element;

    setup(async () => {
        element = await fixture(html`<base-input></base-input>`);
    });

    test('should initialize with default properties', () => {
        assert.equal(element.label, '');
        assert.equal(element.placeholder, '');
        assert.equal(element.value, '');
        assert.isFalse(element.disabled);
        assert.isFalse(element.required);
        assert.equal(element.error, '');
        assert.equal(element.name, '');
    });

    test('should render label when provided', async () => {
        element.label = 'Test Label';
        element.requestUpdate();
        await element.updateComplete;

        const label = element.shadowRoot.querySelector('.input-label');
        assert.exists(label);
        assert.equal(label.textContent.trim(), 'Test Label');
    });

    test('should not render label when not provided', async () => {
        element.label = '';
        element.requestUpdate();
        await element.updateComplete;

        const label = element.shadowRoot.querySelector('.input-label');
        assert.notExists(label);
    });

    test('should render required asterisk when required is true', async () => {
        element.label = 'Test Label';
        element.required = true;
        element.requestUpdate();
        await element.updateComplete;

        const requiredSpan = element.shadowRoot.querySelector('.input-required');
        assert.exists(requiredSpan);
        assert.equal(requiredSpan.textContent, '*');
    });

    test('should not render required asterisk when required is false', async () => {
        element.label = 'Test Label';
        element.required = false;
        element.requestUpdate();
        await element.updateComplete;

        const requiredSpan = element.shadowRoot.querySelector('.input-required');
        assert.notExists(requiredSpan);
    });

    test('should render error message when error is provided', async () => {
        element.error = 'This is an error message';
        element.requestUpdate();
        await element.updateComplete;

        const errorMessage = element.shadowRoot.querySelector('.input-error-message');
        assert.exists(errorMessage);
        assert.equal(errorMessage.textContent.trim(), 'This is an error message');
    });

    test('should not render error message when error is not provided', async () => {
        element.error = '';
        element.requestUpdate();
        await element.updateComplete;

        const errorMessage = element.shadowRoot.querySelector('.input-error-message');
        assert.notExists(errorMessage);
    });

    test('should have correct CSS custom properties', () => {
        const styles = getComputedStyle(element);
        assert.equal(styles.getPropertyValue('--input-background').trim(), '#ffffff');
        assert.equal(styles.getPropertyValue('--input-border-color').trim(), '#e2e8f0');
        assert.equal(styles.getPropertyValue('--input-border-radius').trim(), '8px');
    });
});

suite('TextInput Component', () => {
    let element;

    setup(async () => {
        element = await fixture(html`<text-input></text-input>`);
    });

    test('should initialize with default properties', () => {
        assert.equal(element.label, '');
        assert.equal(element.placeholder, '');
        assert.equal(element.value, '');
        assert.isFalse(element.disabled);
        assert.isFalse(element.required);
        assert.equal(element.error, '');
        assert.equal(element.name, '');
        assert.equal(element.type, 'text');
        assert.isNull(element.maxlength);
        assert.isNull(element.minlength);
    });

    test('should render base-input wrapper with correct properties', async () => {
        element.label = 'Test Label';
        element.required = true;
        element.error = 'Error message';
        element.name = 'test-input';
        element.requestUpdate();
        await element.updateComplete;

        const baseInput = element.shadowRoot.querySelector('base-input');
        assert.exists(baseInput);
        assert.equal(baseInput.label, 'Test Label');
        assert.isTrue(baseInput.required);
        assert.equal(baseInput.error, 'Error message');
        assert.equal(baseInput.name, 'test-input');
    });

    test('should render input element with correct attributes', async () => {
        element.placeholder = 'Enter text';
        element.value = 'test value';
        element.type = 'email';
        element.name = 'email-input';
        element.maxlength = 100;
        element.minlength = 5;
        element.requestUpdate();
        await element.updateComplete;

        const input = element.shadowRoot.querySelector('input');
        assert.exists(input);
        assert.equal(input.placeholder, 'Enter text');
        assert.equal(input.value, 'test value');
        assert.equal(input.type, 'email');
        assert.equal(input.name, 'email-input');
        assert.equal(input.maxLength, 100);
        assert.equal(input.minLength, 5);
    });

    test('should apply error class when error is present', async () => {
        element.error = 'Error message';
        element.requestUpdate();
        await element.updateComplete;

        const input = element.shadowRoot.querySelector('input');
        assert.isTrue(input.classList.contains('error'));
    });

    test('should not apply error class when no error', async () => {
        element.error = '';
        element.requestUpdate();
        await element.updateComplete;

        const input = element.shadowRoot.querySelector('input');
        assert.isFalse(input.classList.contains('error'));
    });

    test('should handle input event correctly', async () => {
        const input = element.shadowRoot.querySelector('input');
        let eventDetail = null;

        element.addEventListener('input', (e) => {
            eventDetail = e.detail;
        });

        input.value = 'new value';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        assert.equal(element.value, 'new value');
        assert.deepEqual(eventDetail, { value: 'new value' });
    });

    test('should handle disabled state', async () => {
        element.disabled = true;
        element.requestUpdate();
        await element.updateComplete;

        const input = element.shadowRoot.querySelector('input');
        assert.isTrue(input.disabled);
    });

    test('should handle required state', async () => {
        element.required = true;
        element.requestUpdate();
        await element.updateComplete;

        const input = element.shadowRoot.querySelector('input');
        assert.isTrue(input.required);
    });

    test('should handle different input types', async () => {
        const types = ['text', 'email', 'password', 'number'];
        
        for (const type of types) {
            element.type = type;
            element.requestUpdate();
            await element.updateComplete;

            const input = element.shadowRoot.querySelector('input');
            assert.equal(input.type, type);
        }
    });

    test('should have correct CSS custom properties', () => {
        const styles = getComputedStyle(element);
        assert.equal(styles.getPropertyValue('--text-input-background').trim(), '#ffffff');
        assert.equal(styles.getPropertyValue('--text-input-focus-border-color').trim(), '#ff6303');
        assert.equal(styles.getPropertyValue('--text-input-error-border-color').trim(), '#e53e3e');
    });
});

suite('Dropdown Component', () => {
    let element;

    setup(async () => {
        element = await fixture(html`<input-dropdown></input-dropdown>`);
    });

    test('should initialize with default properties', () => {
        assert.equal(element.label, '');
        assert.equal(element.value, '');
        assert.isFalse(element.disabled);
        assert.isFalse(element.required);
        assert.equal(element.error, '');
        assert.equal(element.name, '');
        assert.deepEqual(element.options, []);
    });

    test('should render base-input wrapper with correct properties', async () => {
        element.label = 'Select Option';
        element.required = true;
        element.error = 'Please select an option';
        element.name = 'dropdown-input';
        element.requestUpdate();
        await element.updateComplete;

        const baseInput = element.shadowRoot.querySelector('base-input');
        assert.exists(baseInput);
        assert.equal(baseInput.label, 'Select Option');
        assert.isTrue(baseInput.required);
        assert.equal(baseInput.error, 'Please select an option');
        assert.equal(baseInput.name, 'dropdown-input');
    });

    test('should render select element with correct attributes', async () => {
        element.name = 'test-dropdown';
        element.required = true;
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        assert.exists(select);
        assert.equal(select.name, 'test-dropdown');
        assert.isTrue(select.required);
    });

    test('should render default "Please select" option', async () => {
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        const defaultOption = select.querySelector('option[value=""]');
        assert.exists(defaultOption);
        assert.equal(defaultOption.textContent.trim(), 'Please select');
        assert.isTrue(defaultOption.disabled);
    });

    test('should render options correctly', async () => {
        element.options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2', disabled: true },
            { value: 'option3', label: 'Option 3' }
        ];
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        const options = select.querySelectorAll('option:not([value=""])');
        
        assert.equal(options.length, 3);
        assert.equal(options[0].value, 'option1');
        assert.equal(options[0].textContent.trim(), 'Option 1');
        assert.isFalse(options[0].disabled);
        
        assert.equal(options[1].value, 'option2');
        assert.equal(options[1].textContent.trim(), 'Option 2');
        assert.isTrue(options[1].disabled);
        
        assert.equal(options[2].value, 'option3');
        assert.equal(options[2].textContent.trim(), 'Option 3');
        assert.isFalse(options[2].disabled);
    });

    test('should handle option selection correctly', async () => {
        element.options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ];
        element.value = 'option1';
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        const selectedOption = select.querySelector('option[value="option1"]');
        assert.isTrue(selectedOption.selected);
    });

    test('should apply error class when error is present', async () => {
        element.error = 'Error message';
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        assert.isTrue(select.classList.contains('error'));
    });

    test('should handle change event correctly', async () => {
        element.options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ];
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        let eventDetail = null;

        element.addEventListener('change', (e) => {
            eventDetail = e.detail;
        });

        select.value = 'option2';
        select.dispatchEvent(new Event('change', { bubbles: true }));

        assert.equal(element.value, 'option2');
        assert.deepEqual(eventDetail, { value: 'option2' });
    });

    test('should handle disabled state', async () => {
        element.disabled = true;
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        assert.isTrue(select.disabled);
    });

    test('should handle empty options array', async () => {
        element.options = [];
        element.requestUpdate();
        await element.updateComplete;

        const select = element.shadowRoot.querySelector('select');
        const options = select.querySelectorAll('option:not([value=""])');
        assert.equal(options.length, 0);
    });

    test('should have correct CSS custom properties', () => {
        const styles = getComputedStyle(element);
        assert.equal(styles.getPropertyValue('--dropdown-background').trim(), '#ffffff');
        assert.equal(styles.getPropertyValue('--dropdown-focus-border-color').trim(), '#ff6303');
        assert.equal(styles.getPropertyValue('--dropdown-hover-background').trim(), '#f8fafc');
    });
});

suite('Button Component', () => {
    let element;

    setup(async () => {
        element = await fixture(html`<app-button></app-button>`);
    });

    test('should initialize with default properties', () => {
        assert.equal(element.label, 'button'); // This comes from getMessage('button')
        assert.isFalse(element.disabled);
        assert.isFalse(element.loading);
        assert.equal(element.type, 'button');
        assert.equal(element.variant, 'primary');
    });

    test('should render button element with correct attributes', async () => {
        element.type = 'submit';
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        assert.exists(button);
        assert.equal(button.type, 'submit');
    });

    test('should render button label correctly', async () => {
        element.label = 'Click Me';
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        const labelSpan = button.querySelector('span');
        assert.exists(labelSpan);
        assert.equal(labelSpan.textContent.trim(), 'Click Me');
    });

    test('should handle disabled state', async () => {
        element.disabled = true;
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        assert.isTrue(button.disabled);
    });

    test('should handle loading state', async () => {
        element.loading = true;
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        assert.isTrue(button.classList.contains('loading'));
        assert.isTrue(button.disabled);
    });

    test('should render spinner when loading', async () => {
        element.loading = true;
        element.requestUpdate();
        await element.updateComplete;

        const spinner = element.shadowRoot.querySelector('.spinner');
        assert.exists(spinner);
    });

    test('should not render spinner when not loading', async () => {
        element.loading = false;
        element.requestUpdate();
        await element.updateComplete;

        const spinner = element.shadowRoot.querySelector('.spinner');
        assert.notExists(spinner);
    });

    test('should handle variant classes correctly', async () => {
        element.variant = 'secondary';
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        assert.isTrue(button.classList.contains('secondary'));
    });

    test('should handle click event correctly when enabled', async () => {
        let eventDetail = null;
        element.addEventListener('click', (e) => {
            eventDetail = e.detail;
        });

        const button = element.shadowRoot.querySelector('button');
        const clickEvent = new MouseEvent('click');
        button.dispatchEvent(clickEvent);

        assert.exists(eventDetail);
        assert.exists(eventDetail.event);
    });

    test('should not handle click event when disabled', async () => {
        element.disabled = true;
        element.requestUpdate();
        await element.updateComplete;

        let eventFired = false;
        element.addEventListener('click', () => {
            eventFired = true;
        });

        const button = element.shadowRoot.querySelector('button');
        const clickEvent = new MouseEvent('click');
        button.dispatchEvent(clickEvent);

        assert.isFalse(eventFired);
    });

    test('should not handle click event when loading', async () => {
        element.loading = true;
        element.requestUpdate();
        await element.updateComplete;

        let eventFired = false;
        element.addEventListener('click', () => {
            eventFired = true;
        });

        const button = element.shadowRoot.querySelector('button');
        const clickEvent = new MouseEvent('click');
        button.dispatchEvent(clickEvent);

        assert.isFalse(eventFired);
    });

    test('should render icon slot when provided', async () => {
        const iconSlot = element.shadowRoot.querySelector('slot[name="icon"]');
        assert.exists(iconSlot);
    });

    test('should have correct CSS custom properties', () => {
        const styles = getComputedStyle(element);
        assert.equal(styles.getPropertyValue('--button-background').trim(), 'transparent');
        assert.equal(styles.getPropertyValue('--button-border-color').trim(), '#404040');
        assert.equal(styles.getPropertyValue('--button-hover-background').trim(), '#ff6303');
    });

    test('should apply correct classes based on state', async () => {
        element.loading = true;
        element.variant = 'secondary';
        element.requestUpdate();
        await element.updateComplete;

        const button = element.shadowRoot.querySelector('button');
        assert.isTrue(button.classList.contains('loading'));
        assert.isTrue(button.classList.contains('secondary'));
    });
});

suite('Input Components Integration', () => {
    test('should work together in a form context', async () => {
        const form = await fixture(html`
            <form>
                <text-input 
                    label="Email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="Enter your email">
                </text-input>
                <input-dropdown 
                    label="Country" 
                    name="country" 
                    required 
                    .options=${[
                        { value: 'us', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' }
                    ]}>
                </input-dropdown>
                <app-button 
                    label="Submit" 
                    type="submit">
                </app-button>
            </form>
        `);

        const textInput = form.querySelector('text-input');
        const dropdown = form.querySelector('input-dropdown');
        const button = form.querySelector('app-button');

        assert.exists(textInput);
        assert.exists(dropdown);
        assert.exists(button);

        // Test that components render correctly
        assert.equal(textInput.label, 'Email');
        assert.equal(dropdown.label, 'Country');
        assert.equal(button.label, 'Submit');
    });
});
