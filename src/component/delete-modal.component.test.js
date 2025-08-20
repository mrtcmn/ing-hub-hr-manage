import {
    html
} from 'lit/static-html.js';
import {
    fixture,
    assert
} from '@open-wc/testing';
import './delete-modal.component.js';

suite('DeleteModalComponent', () => {
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
        
        const proceedButton = el.shadowRoot.querySelector('.proceed-button');
        proceedButton.click();
        await el.updateComplete;
        
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
        
        const cancelButton = el.shadowRoot.querySelector('.cancel-button');
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
        
        // Check that body overflow is not modified
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
        
        const employeeName = el.shadowRoot.querySelector('.modal-message strong');
        assert.equal(employeeName.textContent, 'John Doe');
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
        
        // Check that employee name is displayed
        const employeeNameElement = el.shadowRoot.querySelector('.modal-message strong');
        assert.equal(employeeNameElement.textContent, 'John Doe');
    });

});
