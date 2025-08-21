import {
    html
} from 'lit/static-html.js';
import {
    fixture,
    assert
} from '@open-wc/testing';
import './delete-modal.component.js';
import '../component/input.component.js';
import { setMessages } from '../utils/localization.js';
import { messages as enMessages } from '../locales/en.js';
import { messages as trMessages } from '../locales/tr.js';

suite('DeleteModalComponent', () => {
    setup(() => {
        // Set default locale to English for tests
        setMessages(enMessages);
    });

    test('is defined', () => {
        const el = document.createElement('delete-modal');
        assert.instanceOf(el, HTMLElement);
    });

    test('should have default properties', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        assert.isFalse(el.isOpen);
        assert.equal(el.employeeName, '');
        assert.equal(el.employeeId, '');
    });

    test('should open modal with employee details', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        assert.isTrue(el.isOpen);
        assert.equal(el.employeeName, 'John Doe');
        assert.equal(el.employeeId, '123');
        assert.equal(document.body.style.overflow, 'hidden');
    });

    test('should close modal and restore body scroll', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        el.close();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
        assert.equal(document.body.style.overflow, '');
    });

    test('should close modal when clicking overlay', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        const overlay = el.shadowRoot.querySelector('.modal-overlay');
        overlay.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

    test('should close modal when clicking close button', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        const closeButton = el.shadowRoot.querySelector('.close-button');
        closeButton.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

    test('should dispatch deleteConfirmed event and close modal when proceed button is clicked', async () => {
        let eventDispatched = false;
        let eventDetail = null;
        
        const el = await fixture(html`
            <delete-modal @deleteConfirmed=${(e) => {
                eventDispatched = true;
                eventDetail = e.detail;
            }}></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        const proceedButton = el.shadowRoot.querySelector('app-button[variant="secondary"]');
        proceedButton.click();
        
        // Wait for the timeout in handleProceed (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2100));
        
        assert.isTrue(eventDispatched);
        assert.deepEqual(eventDetail, { employeeId: '123' });
        assert.isFalse(el.isOpen);
    });

    test('should close modal when cancel button is clicked', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        const cancelButton = el.shadowRoot.querySelector('app-button:not([variant])');
        cancelButton.click();
        await el.updateComplete;
        
        assert.isFalse(el.isOpen);
    });

    test('should not render modal content when closed', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        assert.isFalse(el.isOpen);
        const modalContent = el.shadowRoot.querySelector('.modal-container');
        assert.isNull(modalContent);
    });

    test('should not render modal content initially', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        // Check that modal is initially closed
        assert.isFalse(el.isOpen);
        
        // Check that no modal content is rendered
        const overlay = el.shadowRoot.querySelector('.modal-overlay');
        const modalContainer = el.shadowRoot.querySelector('.modal-container');
        
        assert.isNull(overlay);
        assert.isNull(modalContainer);
        
        // Check that body overflow is not modified initially
        assert.notEqual(document.body.style.overflow, 'hidden');
    });

    test('should render modal content when open', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        const modalContent = el.shadowRoot.querySelector('.modal-container');
        assert.isNotNull(modalContent);
        
        // Check that employee name is in the modal message (no strong tag)
        const modalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(modalMessage.textContent, 'John Doe');
    });

    test('should handle property changes correctly', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        // Test isOpen property change
        el.isOpen = true;
        await el.updateComplete;
        assert.isTrue(el.isOpen);
        
        // Test employeeName property change
        el.employeeName = 'Jane Smith';
        await el.updateComplete;
        assert.equal(el.employeeName, 'Jane Smith');
        
        // Test employeeId property change
        el.employeeId = '456';
        await el.updateComplete;
        assert.equal(el.employeeId, '456');
    });

    test('should work when opened via ref method call', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        // Initially closed
        assert.isFalse(el.isOpen);
        let modalContent = el.shadowRoot.querySelector('.modal-container');
        assert.isNull(modalContent);
        
        // Open via method call (like ref approach)
        el.open('John Doe', '123');
        await el.updateComplete;
        
        assert.isTrue(el.isOpen);
        assert.equal(el.employeeName, 'John Doe');
        assert.equal(el.employeeId, '123');
        
        modalContent = el.shadowRoot.querySelector('.modal-container');
        assert.isNotNull(modalContent);
        
        // Check that employee name is displayed in the message (no strong tag)
        const modalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(modalMessage.textContent, 'John Doe');
    });

    // New tests for locale functionality
    test('should display English locale text when English is set', async () => {
        setMessages(enMessages);
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        // Check modal title
        const modalTitle = el.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'Are you sure?');
        
        // Check close button title
        const closeButton = el.shadowRoot.querySelector('.close-button');
        assert.equal(closeButton.getAttribute('title'), 'Close');
        
        // Check modal message (formatted with employee name)
        const modalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(modalMessage.textContent, 'Selected Employee record of John Doe will be deleted.');
        
        // Check button labels - app-button components render text in span elements
        const cancelButton = el.shadowRoot.querySelector('app-button:not([variant])');
        const proceedButton = el.shadowRoot.querySelector('app-button[variant="secondary"]');
        assert.equal(cancelButton.shadowRoot.querySelector('span').textContent, 'Cancel');
        assert.equal(proceedButton.shadowRoot.querySelector('span').textContent, 'Proceed');
    });

    test('should display Turkish locale text when Turkish is set', async () => {
        setMessages(trMessages);
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        // Check modal title
        const modalTitle = el.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'Emin misiniz?');
        
        // Check close button title
        const closeButton = el.shadowRoot.querySelector('.close-button');
        assert.equal(closeButton.getAttribute('title'), 'Kapat');
        
        // Check modal message (formatted with employee name)
        const modalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(modalMessage.textContent, 'Seçilen çalışan kaydı John Doe silinecektir.');
        
        // Check button labels - app-button components render text in span elements
        const cancelButton = el.shadowRoot.querySelector('app-button:not([variant])');
        const proceedButton = el.shadowRoot.querySelector('app-button[variant="secondary"]');
        assert.equal(cancelButton.shadowRoot.querySelector('span').textContent, 'İptal');
        assert.equal(proceedButton.shadowRoot.querySelector('span').textContent, 'Devam Et');
    });

    test('should format message correctly with employee name placeholder', async () => {
        setMessages(enMessages);
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('Jane Smith', '456');
        await el.updateComplete;
        
        const modalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(modalMessage.textContent, 'Selected Employee record of Jane Smith will be deleted.');
        
        // Test with different employee name
        el.open('Bob Johnson', '789');
        await el.updateComplete;
        
        const updatedModalMessage = el.shadowRoot.querySelector('.modal-message');
        assert.include(updatedModalMessage.textContent, 'Selected Employee record of Bob Johnson will be deleted.');
    });

    test('should handle locale switching correctly', async () => {
        // Create component with English locale
        setMessages(enMessages);
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        el.open('John Doe', '123');
        await el.updateComplete;
        
        let modalTitle = el.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'Are you sure?');
        
        // Switch to Turkish and create new component instance
        setMessages(trMessages);
        const elTurkish = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        elTurkish.open('John Doe', '123');
        await elTurkish.updateComplete;
        
        modalTitle = elTurkish.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'Emin misiniz?');
        
        // Switch back to English and create new component instance
        setMessages(enMessages);
        const elEnglish = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        elEnglish.open('John Doe', '123');
        await elEnglish.updateComplete;
        
        modalTitle = elEnglish.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'Are you sure?');
    });

    test('should fallback to key when message is not found', async () => {
        const el = await fixture(html`
            <delete-modal></delete-modal>
        `);
        
        // Set empty messages to test fallback
        setMessages({});
        el.open('John Doe', '123');
        await el.updateComplete;
        
        // Should fallback to the key itself
        const modalTitle = el.shadowRoot.querySelector('.modal-title');
        assert.equal(modalTitle.textContent, 'are_you_sure');
        
        const closeButton = el.shadowRoot.querySelector('.close-button');
        assert.equal(closeButton.getAttribute('title'), 'close');
    });
});
