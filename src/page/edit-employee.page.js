import { LitElement, html, css } from 'lit';
import { TanStackFormController } from '@tanstack/lit-form';
import { z } from 'zod';
import store, { DEPARTMENTS , POSITIONS} from '../store/employee.store.js';
import { getMessage } from '../utils/localization.js';
import '../component/input.component.js';
import { Router } from '@vaadin/router';

// Employee validation schema using Zod
const employeeSchema = z.object({
    firstName: z.string()
        .min(2, 'first_name_min_length')
        .max(50, 'first_name_max_length')
        .regex(/^[a-zA-Z\s]+$/, 'first_name_invalid_chars'),
    lastName: z.string()
        .min(2, 'last_name_min_length')
        .max(50, 'last_name_max_length')
        .regex(/^[a-zA-Z\s]+$/, 'last_name_invalid_chars'),
    email: z
        .email('email_invalid')
        .min(5, 'email_min_length')
        .max(100, 'email_max_length'),
    phone: z.string()
        .regex(/^[\d\s\-\+\(\)]+$/, 'phone_invalid')
        .min(10, 'phone_min_length')
        .max(20, 'phone_max_length'),
    department: z.string()
        .min(1, 'department_required'),
    position: z.string()
        .min(1, 'position_required'),
    salary: z.number()
        .min(1, 'salary_min'),
    dateOfEmployment: z.coerce.date().max(new Date(), 'date_future_error')
});


const fakeLoading = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
}

export class EditEmployeePage extends LitElement {
    static get properties() {
        return {
            employeeId: { type: String },
            employee: { type: Object },
            isLoading: { type: Boolean },
            isSubmitting: { type: Boolean },
            error: { type: String },
            stateOfUpdateOfCreate: { type: String }
        };
    }

    constructor() {
        super();
        this.employeeId = '';
        this.employee = null;
        this.isLoading = false;
        this.isSubmitting = false;
        this.error = '';
        this.stateOfUpdateOfCreate = '';
        // Initialize TanStack Form
        this.form = new TanStackFormController(this, {
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                department: '',
                position: '',
                salary: 0,
                dateOfEmployment: ''
            },
            validators: {
                onChange: employeeSchema,
                onSubmit: employeeSchema
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadEmployee();
    }

    async loadEmployee() {
        const urlParams = new URLSearchParams(window.location.search);
        this.employeeId = urlParams.get('id');

        if (this.employeeId === 'new') {

          
            return;
        }
        
        if (!this.employeeId) {
            this.error = getMessage('no_employee_id');
            return;
        }

        this.isLoading = true;
        try {
            this.employee = store.getState().getEmployee(parseInt(this.employeeId));
            
            if (!this.employee) {
                this.error = getMessage('employee_not_found_error');
                return;
            }

            // Update form with employee data
            this.form.api.setFieldValue('firstName', this.employee.firstName);
            this.form.api.setFieldValue('lastName', this.employee.lastName);
            this.form.api.setFieldValue('email', this.employee.email);
            this.form.api.setFieldValue('phone', this.employee.phone);
            this.form.api.setFieldValue('department', this.employee.department);
            this.form.api.setFieldValue('position', this.employee.position);
            this.form.api.setFieldValue('salary', this.employee.salary);
            this.form.api.setFieldValue('dateOfEmployment', this.employee.dateOfEmployment.split('T')[0]);
            
        } catch (error) {
            this.error = getMessage('failed_load_employee');
            console.error('Error loading employee:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.form.api.state.canSubmit || !this.form.api.state.isDirty) {
            return;
        }

        if (this.employeeId === 'new') {
            
            this.isSubmitting = true;
            await fakeLoading(2000);
            store.getState().addEmployee(this.form.api.state.values);
            this.stateOfUpdateOfCreate = 'success';
            await fakeLoading(2000);
            Router.go('/');
            this.isSubmitting = false;
            return;
        }

        this.isSubmitting = true;
        await fakeLoading(2000);
        try {
            const formData = this.form.api.state.values;
            
            // Update employee in store
            store.getState().editEmployee(parseInt(this.employeeId), {
                ...this.employee,
                ...formData,
                dateOfEmployment: new Date(formData.dateOfEmployment).toISOString()
            });


            this.stateOfUpdateOfCreate = 'success';
            // Redirect back to employee list
            await fakeLoading(2000);
            Router.go('/');
        } catch (error) {
            this.error = getMessage('failed_update_employee');
            console.error('Error updating employee:', error);
            this.stateOfUpdateOfCreate = 'error';
        } finally {
            this.isSubmitting = false;
        }
    }

    handleCancel() {
        Router.go('/');
    }

    getError(field) {
        return field.state.meta?.isDirty ? field.state.meta?.errors?.map(i=> getMessage(i?.message)).join(', ') : '';
    }

    render() {
        if (this.isLoading) {
            return html`
                <div class="loading-container">
                    <div class="spinner"></div>
                    <p>${getMessage('loading_employee_data')}</p>
                </div>
            `;
        }

        if (this.error) {
            return html`
                <div class="error-container">
                    <h2>${getMessage('error')}</h2>
                    <p>${this.error}</p>
                    <app-button 
                        label="${getMessage('go_back')}" 
                        @click=${this.handleCancel}
                        variant="secondary"
                    ></app-button>
                </div>
            `;
        }

        if (!this.employee && this.employeeId !== 'new') {
            return html`
                <div class="not-found-container">
                    <h2>${getMessage('employee_not_found')}</h2>
                    <p>${getMessage('employee_not_found_message')}</p>
                    <app-button 
                        label="${getMessage('go_back')}" 
                        @click=${this.handleCancel}
                        variant="secondary"
                    ></app-button>
                </div>
            `;
        }

        return html`
            <card-component background="white" statusOfBottomBar=${this.stateOfUpdateOfCreate}>
                <div slot="body" class={edit-employee-container}>
                <div class="header">
                    <h2 class="header-title">${getMessage('edit_employee')}</h2>
                    ${this.employeeId === 'new' ? html`<p>${getMessage('create_new_employee')}</p>` : html`<p>${formatMessage(getMessage('update_employee_info'), this.employee.firstName, this.employee.lastName)}</p>`}
                </div>

            <div class="form-grid">
                <form @submit=${this.handleSubmit} class="edit-form">

                        ${this.form.field(
                            {
                                name: 'firstName',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value || value.length < 2) {
                                            return getMessage('first_name_min_length');
                                        }
                                        if (value.length > 50) {
                                            return getMessage('first_name_max_length');
                                        }
                                        if (!/^[a-zA-Z\s]+$/.test(value)) {
                                            return getMessage('first_name_invalid_chars');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('first_name')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="firstName"
                                    placeholder="${getMessage('enter_first_name')}"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'lastName',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value || value.length < 2) {
                                            return getMessage('last_name_min_length');
                                        }
                                        if (value.length > 50) {
                                            return getMessage('last_name_max_length');
                                        }
                                        if (!/^[a-zA-Z\s]+$/.test(value)) {
                                            return getMessage('last_name_invalid_chars');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('last_name')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="lastName"
                                    placeholder="${getMessage('enter_last_name')}"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'email',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value) return getMessage('email_required');
                                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                            return getMessage('email_invalid');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('email')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="email"
                                    type="email"
                                    placeholder="${getMessage('enter_email_address')}"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'phone',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value) return getMessage('phone_required');
                                        if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
                                            return getMessage('phone_invalid');
                                        }
                                        if (value.replace(/\D/g, '').length < 10) {
                                            return getMessage('phone_min_length');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('phone')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="phone"
                                    placeholder="${getMessage('enter_phone_number')}"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'department',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value) return getMessage('department_required');
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <input-dropdown
                                    label="${getMessage('department')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="department"
                                    .options=${DEPARTMENTS.map(dept => ({
                                        value: dept,
                                        label: dept
                                    }))}
                                    @change=${(e) => field.handleChange(e.currentTarget.value)}
                                ></input-dropdown>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'position',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value) return getMessage('position_required');
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <input-dropdown
                                    label="${getMessage('position')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="position"
                                    .options=${POSITIONS.map(pos => ({
                                        value: pos,
                                        label: pos
                                    }))}
                                    @change=${(e) => field.handleChange(e.currentTarget.value)}
                                ></input-dropdown>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'salary',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value || value < 30000) {
                                            return getMessage('salary_min');
                                        }
                                        if (value > 200000) {
                                            return getMessage('salary_max');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('salary')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="salary"
                                    type="number"
                                    placeholder="${getMessage('enter_salary')}"
                                    @input=${(e) => field.handleChange(parseInt(e.currentTarget.value) || 0)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'dateOfEmployment',
                                validators: {
                                    onBlur: ({ value }) => {
                                        if (!value) return getMessage('date_required');
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        if (selectedDate > today) {
                                            return getMessage('date_future_error');
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="${getMessage('date_of_employment')}"
                                    .value=${field.state.value}
                                    .error=${this.getError(field)}
                                    .required=${true}
                                    name="dateOfEmployment"
                                    type="date"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}
                    </div>

                   
                </div>
            </form>
        </div>
        <div class="form-actions" slot="footer">
                        <app-button
                            label="${getMessage('cancel')}"
                            @click=${this.handleCancel}
                            variant="secondary"
                        ></app-button>
                        
                        <app-button
                            label=${this.isSubmitting ? getMessage('updating') : this.employeeId === 'new' ? getMessage('create_employee') : getMessage('update_employee')}
                            @click=${this.handleSubmit}
                            ?disabled=${!this.form.api.state.canSubmit || this.isSubmitting || !this.form.api.state.isDirty}
                            .loading=${this.isSubmitting}
                        ></app-button>
                    </div>
    </card-component>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: block;
                padding: 24px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .edit-employee-container {
                background: white;
            }

            .header {
                padding: 10px;
                text-align: left;
            }

            .header-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #ff6303;
                margin: 0;
            }

            .header p {
                margin: 0;
                color: #718096;
                font-size: 16px;
            }

            form {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                gap: 24px;
                padding: 10px;
            }

            .form-actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                align-items: center;
                flex-wrap: wrap;
            }

            .loading-container,
            .error-container,
            .not-found-container {
                text-align: center;
                padding: 48px 24px;
            }

            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #e2e8f0;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px auto;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .error-container h2,
            .not-found-container h2 {
                color: #e53e3e;
                margin-bottom: 16px;
            }

            .error-container p,
            .not-found-container p {
                color: #718096;
                margin-bottom: 24px;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                :host {
                    padding: 16px;
                }

                .edit-employee-container {
                    padding: 24px 16px;
                }

                .form-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .form-actions {
                    flex-direction: column;
                    width: 100%;
                }

                .form-actions app-button {
                    width: 100%;
                }
            }
        `;
    }
}

customElements.define('edit-employee-page', EditEmployeePage);
