import {
    html
} from 'lit/static-html.js';
import {
    fixture,
    assert
} from '@open-wc/testing';
import './card.component.js';

suite('CardComponent', () => {
    test('is defined', () => {
        const el = document.createElement('card-component');
        assert.instanceOf(el, HTMLElement);
    });

    test('should have default loading state as false', async () => {
        const el = await fixture(html`
            <card-component></card-component>
        `);
        assert.isFalse(el.loading);
    });

    test('should render with loading state when loading is true', async () => {
        const el = await fixture(html`
            <card-component loading></card-component>
        `);
        assert.isTrue(el.loading);
        assert.isTrue(el.hasAttribute('loading'));
    });

    test('should render header slot correctly', async () => {
        const el = await fixture(html`
            <card-component>
                <div slot="header">Header Content</div>
            </card-component>
        `);
        const headerSlot = el.shadowRoot.querySelector('slot[name="header"]');
        assert.exists(headerSlot);
        
        const assignedElements = headerSlot.assignedElements();
        assert.equal(assignedElements.length, 1);
        assert.equal(assignedElements[0].textContent, 'Header Content');
    });

    test('should render body slot correctly', async () => {
        const el = await fixture(html`
            <card-component>
                <div slot="body">Body Content</div>
            </card-component>
        `);
        const bodySlot = el.shadowRoot.querySelector('slot[name="body"]');
        assert.exists(bodySlot);
        
        const assignedElements = bodySlot.assignedElements();
        assert.equal(assignedElements.length, 1);
        assert.equal(assignedElements[0].textContent, 'Body Content');
    });

    test('should render footer slot correctly', async () => {
        const el = await fixture(html`
            <card-component>
                <div slot="footer">Footer Content</div>
            </card-component>
        `);
        const footerSlot = el.shadowRoot.querySelector('slot[name="footer"]');
        assert.exists(footerSlot);
        
        const assignedElements = footerSlot.assignedElements();
        assert.equal(assignedElements.length, 1);
        assert.equal(assignedElements[0].textContent, 'Footer Content');
    });

    test('should render all slots together', async () => {
        const el = await fixture(html`
            <card-component>
                <div slot="header">Header</div>
                <div slot="body">Body</div>
                <div slot="footer">Footer</div>
            </card-component>
        `);
        
        const headerSlot = el.shadowRoot.querySelector('slot[name="header"]');
        const bodySlot = el.shadowRoot.querySelector('slot[name="body"]');
        const footerSlot = el.shadowRoot.querySelector('slot[name="footer"]');
        
        assert.exists(headerSlot);
        assert.exists(bodySlot);
        assert.exists(footerSlot);
        
        assert.equal(headerSlot.assignedElements()[0].textContent, 'Header');
        assert.equal(bodySlot.assignedElements()[0].textContent, 'Body');
        assert.equal(footerSlot.assignedElements()[0].textContent, 'Footer');
    });

    test('should show loading overlay when loading is true', async () => {
        const el = await fixture(html`
            <card-component loading></card-component>
        `);
        
        // Check if loading attribute is reflected
        assert.isTrue(el.hasAttribute('loading'));
        
        // Check if loading styles are applied (::after and ::before pseudo-elements)
        const computedStyle = getComputedStyle(el);
        // Note: We can't directly test pseudo-elements, but we can verify the attribute is set
        assert.isTrue(el.loading);
    });

    test('should toggle loading state', async () => {
        const el = await fixture(html`
            <card-component></card-component>
        `);
        
        // Initially not loading
        assert.isFalse(el.loading);
        assert.isFalse(el.hasAttribute('loading'));
        
        // Set loading to true
        el.loading = true;
        await el.updateComplete;
        assert.isTrue(el.loading);
        assert.isTrue(el.hasAttribute('loading'));
        
        // Set loading to false
        el.loading = false;
        await el.updateComplete;
        assert.isFalse(el.loading);
        assert.isFalse(el.hasAttribute('loading'));
    });

    test('should render without slots when no content provided', async () => {
        const el = await fixture(html`
            <card-component></card-component>
        `);
        
        const headerSlot = el.shadowRoot.querySelector('slot[name="header"]');
        const bodySlot = el.shadowRoot.querySelector('slot[name="body"]');
        const footerSlot = el.shadowRoot.querySelector('slot[name="footer"]');
        
        assert.exists(headerSlot);
        assert.exists(bodySlot);
        assert.exists(footerSlot);
        
        // Slots should exist but have no assigned elements
        assert.equal(headerSlot.assignedElements().length, 0);
        assert.equal(bodySlot.assignedElements().length, 0);
        assert.equal(footerSlot.assignedElements().length, 0);
    });

    test('should have correct CSS custom properties', async () => {
        const el = await fixture(html`
            <card-component></card-component>
        `);
        
        const computedStyle = getComputedStyle(el);
        // Check if the component has the expected CSS structure
        assert.exists(el.shadowRoot.querySelector('.card-container'));
        assert.exists(el.shadowRoot.querySelector('.card-body'));
        assert.exists(el.shadowRoot.querySelector('.card-footer'));
    });
});
 