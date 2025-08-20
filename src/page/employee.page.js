import { LitElement, html, css } from 'lit';
import { format } from 'date-fns';
import store from '../store/employee.store.js';
import { getMessage } from '../utils/localization.js';
import '../component/card.component.js';
import '../component/delete-modal.component.js';
import { ref, createRef } from 'lit/directives/ref.js';


export class EmployeePage extends LitElement {
    static get properties() {
        return {
            employees: { type: Array },
            currentPage: { type: Number },
            itemsPerPage: { type: Number },
            isDeleteModalOpen: { type: Boolean },
            employeeName: { type: String },
            employeeId: { type: String },
            viewMode: { type: String } // 'list' or 'grid'
        };
    }

    deleteModalRef = createRef();

    constructor() {
        super();
        this.employees = store.getState().employees;
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.viewMode = 'list'; // Default to list view

        this.isDeleteModalOpen = false;
        this.employeeName = '';
        this.employeeId = '';

        // Subscribe to store changes
        store.subscribe((state) => {
            this.employees = state.employees;
        });
    }

    // Pagination methods
    get totalPages() {
        return Math.ceil(this.employees.length / this.itemsPerPage);
    }

    get paginatedEmployees() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.employees.slice(startIndex, endIndex);
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    goToFirstPage() {
        this.currentPage = 1;
    }

    goToLastPage() {
        this.currentPage = this.totalPages;
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    // View mode toggle
    toggleViewMode() {
        this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
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
            width: 100vw;
            box-sizing: border-box;
            overflow-x: auto;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .view-toggle {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .view-btn {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            color: #6c757d;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .view-btn:hover {
            background: #e9ecef;
            border-color: #adb5bd;
        }

        .view-btn.active {
            background: #ff6303;
            border-color: #ff6303;
            color: white;
        }

        .view-btn svg {
            width: 16px;
            height: 16px;
        }

        .page-title {
            font-size: 2rem;
            color: #ff6303;
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
            border: none;
            font-size: 14px;
            color: #333;
            overflow-x: auto;

            thead {
                background: #ffffff;
                border-bottom: 1px solid #dadada;
                color: #ff6303;

                tr {
                    height: 55px;
                    border: none;
                    font-weight: 600;
                    font-size: 12px;
                }
            }

            tbody {
                background: #ffffff;
                border: none;

                tr {
                    padding: 10px;
                    border: none;
                    border-bottom: 1px solid #dadada;
                    text-align: left;

                    td {
                        text-align: center;
                        &:first-child {
                            text-align: left;
                        }
                        &:last-child {
                            text-align: right;
                        }

                    }

                    &:last-child {
                        border-bottom: none;
                    }

                  
                    td {
                        padding: 10px;
                    }
                }
            }
        }

        .employee-actions {
            text-align: right;
            cursor: pointer;
            svg {
                color: #ff6303;
                width: 20px;
                height: 20px;
            }

        
        }

        .employee-actions svg:hover {   
            opacity: 0.6;
        }

        .action-btn {
            cursor: pointer;
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

        .table-pagination {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;
        }

        @media (max-width: 768px) {
            .table-pagination {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
        }

        .pagination-info {
            color: #6c757d;
            font-size: 0.9rem;
        }

        .pagination-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .pagination-btn {
            padding: 8px 12px;
            border: 1px solid #dee2e6;
            color: #495057;
            border-radius: 16px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
            min-width: 40px;
        }

        .pagination-btn:hover:not(:disabled) {
            border-color: #adb5bd;
        }

        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .pagination-btn.active {
            color: #ff6303;
            border-color: #ff6303;
        }

        .page-numbers {
            display: flex;
            gap: 4px;
        }

        /* Grid View Styles */
        .grid-view {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .employee-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
        }

        .employee-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            font-size: 12px;
            padding: 5px 10px;
            background: white;
        }

        .info-row {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
            margin-bottom: 8px;
            padding: 4px 0;
        }

        .info-label {
            color: #959ba0;
            font-size: 0.85rem;
            font-size: 12px;
            font-weight: 600;
        }

        .info-value {
            color: #333;
            max-width: 60%;
            font-size: 14px
            word-break: break-word;
        }

        .card-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .card-edit-btn, .card-delete-btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
        }

        .card-edit-btn {
            background: #6f42c1;
            color: white;
        }

        .card-edit-btn:hover {
            background: #5a32a3;
        }

        .card-delete-btn {
            background: #fd7e14;
            color: white;
        }

        .card-delete-btn:hover {
            background: #e55a00;
        }

        .card-edit-btn svg, .card-delete-btn svg {
            width: 16px;
            height: 16px;
        }

        /* Responsive Grid */
        @media (max-width: 768px) {
            .grid-view {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .employee-card {
                padding: 15px;
            }
            
            .info-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
            
            .info-value {
                text-align: left;
                max-width: 100%;
            }

            .employee-info {
                grid-template-columns: 1fr;

                .info-row {
                    flex-direction: row;
                }
            }
        }

        @media (max-width: 480px) {
            .view-toggle {
                flex-direction: column;
                gap: 4px;
            }
            
            .view-btn {
                padding: 6px 10px;
                font-size: 0.8rem;
            }
        }
    `;


    handleDeleteModal = (employeeName, employeeId) => {
        console.log('handleDeleteModal called with:', employeeName, employeeId);
        console.log('deleteModalRef.value:', this.deleteModalRef.value);

        if (this.deleteModalRef.value) {
            this.deleteModalRef.value.open(employeeName, employeeId);
        } else {
            console.error('Delete modal ref is not ready yet');
        }
    }

    handleDeleteConfirmed = (event) => {
        const { employeeId } = event.detail;
        console.log('Delete confirmed for employee:', employeeId);
        this.removeEmployee(employeeId);
        this.isDeleteModalOpen = false;
    }

    renderGridView() {
        return html`
            <div class="grid-view">
                ${this.paginatedEmployees.map(employee => html`
                    <card-component background="white">
                        <div class="employee-info" slot="body">
                            <div class="info-row">
                                <span class="info-label">${getMessage('first_name')}:</span>
                                <span class="info-value">${employee.firstName}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('last_name')}:</span>
                                <span class="info-value">${employee.lastName}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('date_of_employment')}:</span>
                                <span class="info-value">${employee.dateOfEmployment ? format(new Date(employee.dateOfEmployment), 'dd/MM/yyyy') : ''}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Date of Birth:</span>
                                <span class="info-value">${employee.dateOfBirth ? format(new Date(employee.dateOfBirth), 'dd/MM/yyyy') : ''}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('phone')}:</span>
                                <span class="info-value">${employee.phone || ''}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('email')}:</span>
                                <span class="info-value">${employee.email || ''}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('department')}:</span>
                                <span class="info-value">${employee.department || ''}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">${getMessage('position')}:</span>
                                <span class="info-value">${employee.position || ''}</span>
                            </div>
                        </div>
                        <div slot="footer" class="card-actions">
                            <app-button label=${getMessage('edit')} @click=${this.handleCancel}>
                                <svg slot="icon"  width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                                </svg>
                            </app-button>
                            <app-button label= ${getMessage('delete')}  @click=${() => this.handleDeleteModal(employee.firstName + ' ' + employee.lastName, employee.id)} variant="secondary" ?loading=${this.isLoadingOnProceed}>
                                <svg slot="icon"  width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M10 11v6"/>
                                    <path d="M14 11v6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </app-button>
                        </div>
                    </card-component'>
                `)}
            </div>
            <card-component bodyHidden>
                <div slot="footer">
                    ${this.renderPagination()}
                </div>
            </card-component>
        `;
    }

    renderListView() {
        return html`
            <card-component>
                <table class="employee-table" slot="body">
                    <thead>
                        <tr>
                            <th>${getMessage('first_name')}</th>
                            <th>${getMessage('last_name')}</th>
                            <th>${getMessage('date_of_employment')}</th>
                            <th>${getMessage('phone')}</th>
                            <th>${getMessage('email')}</th>
                            <th>${getMessage('department')}</th>
                            <th>${getMessage('position')}</th>
                            <th>${getMessage('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.paginatedEmployees.map(employee => html`
                        <tr>
                            <td>${employee.firstName}</td>
                            <td>${employee.lastName}</td>
                            <td>${employee.dateOfEmployment ? format(new Date(employee.dateOfEmployment), 'yyyy/MM/dd') : ''}</td>
                            <td>${employee.phone || ''}</td>
                            <td>${employee.email || ''}</td>
                            <td>${employee.department || ''}</td>
                            <td>${employee.position || ''}</td>
                            <td>
                                <div class="employee-actions">
                                    <p @click=${() => this.handleDeleteModal(employee.firstName + ' ' + employee.lastName, employee.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                                        </svg>
                                    </p>
                                    <p @click=${() => this.handleDeleteModal(employee.firstName + ' ' + employee.lastName, employee.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10 11v6"/>
                                            <path d="M14 11v6"/>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                            <path d="M3 6h18"/>
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </p>
                                </div>
                            </td>
                        </tr>
                        `)}
                    </tbody>
                </table>
                <div slot="footer">
                    ${this.renderPagination()}
                </div>
            </card-component>
        `;
    }

    renderPagination() {
        const totalEmployees = this.employees.length;
        const startItem = totalEmployees === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalEmployees);

        return totalEmployees > 0 ? html`
            <div class="table-pagination">
                <div class="pagination-info">
                    Showing ${startItem} to ${endItem} of ${totalEmployees} employees
                </div>
                <div class="pagination-controls">
                    <button 
                        class="pagination-btn" 
                        @click=${this.goToFirstPage}
                        ?disabled=${this.currentPage === 1}
                        title="First page">
                        ««
                    </button>
                    <button 
                        class="pagination-btn" 
                        @click=${this.goToPreviousPage}
                        ?disabled=${this.currentPage === 1}
                        title="Previous page">
                        «
                    </button>
                    
                    <div class="page-numbers">
                        ${this.renderPageNumbers()}
                    </div>
                    
                    <button 
                        class="pagination-btn" 
                        @click=${this.goToNextPage}
                        ?disabled=${this.currentPage === this.totalPages}
                        title="Next page">
                        »
                    </button>
                    <button 
                        class="pagination-btn" 
                        @click=${this.goToLastPage}
                        ?disabled=${this.currentPage === this.totalPages}
                        title="Last page">
                        »»
                    </button>
                </div>
            </div>
        ` : '';
    }

    render() {
        return html`
            <div class="employee-page">
                <div class="page-header">
                    <h1 class="page-title">${getMessage('employee_list')}</h1>
                    <div class="view-toggle">
                        <button 
                            class="view-btn ${this.viewMode === 'list' ? 'active' : ''}"
                            @click=${this.toggleViewMode}
                            title="${getMessage('list_view')}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                            ${getMessage('list_view')}
                        </button>
                        <button 
                            class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}"
                            @click=${this.toggleViewMode}
                            title="${getMessage('grid_view')}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            ${getMessage('grid_view')}
                        </button>
                    </div>
                </div>
                
                ${this.employees.length === 0
                ? html`<card-component><div slot="body" class="no-employees">${getMessage('no_employees')}</div></card-component>`
                : this.viewMode === 'grid'
                    ? this.renderGridView()
                    : this.renderListView()
            }
                <delete-modal 
                    ${ref(this.deleteModalRef)}
                    @deleteConfirmed=${this.handleDeleteConfirmed} />
            </div>
        `;
    }

    renderPageNumbers() {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(html`
                <button 
                    class="pagination-btn ${i === this.currentPage ? 'active' : ''}"
                    @click=${() => this.goToPage(i)}>
                    ${i}
                </button>
            `);
        }

        return pages;
    }
}

customElements.define('employee-page', EmployeePage);
