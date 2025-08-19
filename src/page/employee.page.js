import { LitElement, html, css } from 'lit';
import store from '../store/employee.store.js';
import { getMessage } from '../utils/localization.js';
import '../component/card.component.js';

export class EmployeePage extends LitElement {
    static get properties() {
        return {
            employees: { type: Array },
        };
    }

    constructor() {
        super();
        this.employees = store.getState().employees;

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

    static styles = css`
        .employee-page {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .page-title {
            font-size: 2rem;
            color: #333;
            margin: 0;
        }

        .add-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
        }

        .add-btn:hover {
            background: #0056b3;
        }

        table.employee-table {
            background: white;
            width: 100%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
            border-collapse: collapse;

            thead {
                background: #dadada;

                tr {
                    height: 40px;
                }
            }

            tbody {
                background: #f5f5f5;

                tr {
                    padding: 10px;
                    border-bottom: 1px solid #dadada;

                    &:last-child {
                        border-bottom: none;
                    }

                    td {
                        padding: 10px;
                    }
                }
            }
        }


        .action-btn {
            padding: 6px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .action-btn:hover {
            background: #f5f5f5;
        }

        .edit-btn {
            color: #007bff;
            border-color: #007bff;
        }

        .delete-btn {
            color: #dc3545;
            border-color: #dc3545;
        }

        .no-employees {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
        }
    `;

    render() {
        return html`
            <div class="employee-page">
                <div class="page-header">
                    <h1 class="page-title">${getMessage('employee_list')}</h1>
                    <button class="add-btn">${getMessage('add_employee')}</button>
                </div>
                
                <card-component >
                    ${this.employees.length === 0
                ? html`<div class="no-employees">${getMessage('no_employees')}</div>`
                : html`
                            <table class="employee-table" slot="body">
                                <thead>
                                    <tr>
                                        <th>${getMessage('name')}</th>
                                        <th>${getMessage('email')}</th>
                                        <th>${getMessage('department')}</th>
                                        <th>${getMessage('position')}</th>
                                        <th>${getMessage('salary')}</th>
                                        <th>${getMessage('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.employees.map(employee => html`
                                    <tr>
                                        <td>${employee.name}</td>
                                        <td>${employee.email || ''}</td>
                                        <td>${employee.department || ''}</td>
                                        <td>${employee.position || ''}</td>
                                        <td>$${employee.salary ? employee.salary.toLocaleString() : ''}</td>
                                        <td>
                                            <div class="employee-actions">
                                                <button class="action-btn edit-btn">${getMessage('edit_employee')}</button>
                                                <button class="action-btn delete-btn">${getMessage('delete_employee')}</button>
                                            </div>
                                        </td>
                                    </tr>
                                    `)}
                                </tbody>
                            </table>
                    `}
                    <div slot="footer">
                        <button class="add-btn">${getMessage('add_employee')}</button>
                    </div>
                </card-component>
            </div>
        `;
    }
}

customElements.define('employee-page', EmployeePage);
