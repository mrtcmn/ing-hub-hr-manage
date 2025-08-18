import { LitElement, html } from 'lit';
import './my-element.js';
import './page/employee.page.js';

import { Router } from '@vaadin/router';


class RootElement extends LitElement {

    firstUpdated() {
        const router = new Router(this.shadowRoot.querySelector('#outlet'));
        router.setRoutes([
            { path: '/', component: 'employee-page' },
            { path: '/users', component: 'x-user-list' }
        ]);
    }
    
    render() {
        return html`<div>
            <navbar>
                <a href="/">Home</a>
                <a href="/users">Users</a>
            </navbar>
            <div id="outlet"></div>
        </div>`;
    }
}

customElements.define('root-element', RootElement);