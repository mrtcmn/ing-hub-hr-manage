import {
    html
} from 'lit/static-html.js';
import {
    fixture,
    assert
} from '@open-wc/testing';
import './edit-confirmation-modal.component.js';
import { setMessages } from '../utils/localization.js';
import { messages as enMessages } from '../locales/en.js';

suite('EditConfirmationModalComponent', () => {
    setup(() => {
        setMessages(enMessages);
    });

    test('is defined', () => {
        const el = document.createElement('edit-confirmation-modal');
        assert.instanceOf(el, HTMLElement);
    });

    test('should have default properties', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        assert.isFalse(el.isOpen);
        assert.equal(el.employeeName, '');
        assert.isFalse(el.isLoadingOnProceed);
    });

    test('should open modal with employee name', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        
        assert.isTrue(el.isOpen);
        assert.equal(el.employeeName, 'John Doe');
        assert.equal(document.body.style.overflow, 'hidden');
    });

    test('should close modal and restore body scroll', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        el.close();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
        assert.equal(document.body.style.overflow, '');
    });

    test('should close modal when clicking overlay', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        const overlay = el.shadowRoot.querySelector('.modal-overlay');
        overlay.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

    test('should close modal when clicking close button', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        const closeButton = el.shadowRoot.querySelector('.close-button');
        closeButton.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

    test('should dispatch editConfirmed event when proceed button is clicked', async () => {
        let eventDispatched = false;
        
        const el = await fixture(html`
            <edit-confirmation-modal @editConfirmed=${() => {
                eventDispatched = true;
            }}></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        
        const proceedButton = el.shadowRoot.querySelector('app-button[variant="secondary"]');
        proceedButton.click();
        
        // Wait for the timeout in handleProceed
        await new Promise(resolve => setTimeout(resolve, 1100));
        
        assert.isTrue(eventDispatched);
    });

    test('should close modal when cancel button is clicked', async () => {
        const el = await fixture(html`
            <edit-confirmation-modal></edit-confirmation-modal>
        `);
        
        el.open('John Doe');
        await el.updateComplete;
        
        const cancelButton = el.shadowRoot.querySelector('app-button:not([variant])');
        cancelButton.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

});
