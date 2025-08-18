import { LitElement, html } from 'lit';
import store from '../store/employee.store.js';

export class EmployeePage extends LitElement {
    static get properties() {
        return {
            employees: { type: Array },
        };
    }

    constructor() {
        super();
        this.employees = [];
        
        // Subscribe to store changes
        store.subscribe((state) => {
            this.employees = state.employees;
        });
    }

    // Store action methods
    addEmployee(employee) {
        store.getState().addEmployee(employee);
    }

    removeEmployee(id) {
        store.getState().removeEmployee(id);
    }

    editEmployee(id, updatedEmployee) {
        store.getState().editEmployee(id, updatedEmployee);
    }

    getEmployee(id) {
        return store.getState().getEmployee(id);
    }

    getAllEmployees() {
        return store.getState().getAllEmployees();
    }

    removeAllEmployees() {
        store.getState().removeAllEmployees();
    }

    render() {
        return html`
            <h1>Employee List</h1>
            <ul>
                ${this.employees.map(employee => html`<li>${employee.name}</li>`)}
            </ul>
        `;
    }
}

customElements.define('employee-page', EmployeePage);
