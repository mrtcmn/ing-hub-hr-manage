import { LitElement, html, css } from 'lit';
import store from '../store/employee.store.js';
import { getMessage } from '../utils/localization.js';

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

        .employee-list {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .employee-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #eee;
        }

        .employee-item:last-child {
            border-bottom: none;
        }

        .employee-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
        }

        .employee-name {
            font-weight: 600;
            color: #333;
            font-size: 1.1rem;
        }

        .employee-details {
            display: flex;
            gap: 20px;
            color: #666;
            font-size: 0.9rem;
        }

        .employee-actions {
            display: flex;
            gap: 8px;
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
                
                <div class="employee-list">
                    ${this.employees.length === 0 
                        ? html`<div class="no-employees">${getMessage('no_employees')}</div>`
                        : this.employees.map(employee => html`
                            <div class="employee-item">
                                <div class="employee-info">
                                    <div class="employee-name">${employee.name}</div>
                                    <div class="employee-details">
                                        <span>${employee.email || ''}</span>
                                        <span>${employee.department || ''}</span>
                                        <span>${employee.position || ''}</span>
                                        <span>$${employee.salary ? employee.salary.toLocaleString() : ''}</span>
                                    </div>
                                </div>
                                <div class="employee-actions">
                                    <button class="action-btn edit-btn">${getMessage('edit_employee')}</button>
                                    <button class="action-btn delete-btn">${getMessage('delete_employee')}</button>
                                </div>
                            </div>
                        `)
                    }
                </div>
            </div>
        `;
    }
}

customElements.define('employee-page', EmployeePage);
