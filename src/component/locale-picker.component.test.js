import {
    html
} from 'lit/static-html.js';
import {
    fixture,
    assert
} from '@open-wc/testing';
import './locale-picker.component';


suite('LocalePickerComponent', () => {
    test('is defined', () => {
        const el = document.createElement('locale-picker');
        assert.instanceOf(el, HTMLElement);
    });

    test('should have a default locale', async () => {
        const el = await fixture(html `
      <locale-picker></locale-picker>
    `);
        assert.equal(el.currentLocale, 'en');
    });

    test('should open the dropdown on click', async () => {
        const el = await fixture(html `
      <locale-picker></locale-picker>
    `);
        const trigger = el.shadowRoot.querySelector('.locale__trigger');
        trigger.click();
        await el.updateComplete;
        const options = el.shadowRoot.querySelector('.locale__options');
        assert.isFalse(options.hidden);
    });

    test('should close the dropdown when clicking outside', async () => {
        const el = await fixture(html `
      <locale-picker></locale-picker>
    `);
        el.isDropdownOpen = true;
        await el.updateComplete;
        document.body.click();
        await el.updateComplete;
        assert.isFalse(el.isDropdownOpen);
    });

    test('should change locale when a button is clicked', async () => {
        const el = await fixture(html `
      <locale-picker></locale-picker>
    `);
        el.isDropdownOpen = true;
        await el.updateComplete;
        const button = el.shadowRoot.querySelector('button[class="locale__btn "]');
        button.click();
        await el.updateComplete;
        assert.notEqual(el.currentLocale, 'en');
    });

    test('should dispatch a "locale-changed" event when locale changes', async () => {
        let eventDispatched = false;
        const el = await fixture(html `
      <locale-picker @locale-changed=${() => (eventDispatched = true)}></locale-picker>
    `);
        el.isDropdownOpen = true;
        await el.updateComplete;
        const button = el.shadowRoot.querySelector('button[class="locale__btn "]');
        button.click();
        assert.isTrue(eventDispatched);
    });
});