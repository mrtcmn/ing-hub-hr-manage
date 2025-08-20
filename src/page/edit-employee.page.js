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
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
    email: z
        .email('Please enter a valid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters'),
    phone: z.string()
        .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(20, 'Phone number must be less than 20 characters'),
    department: z.string()
        .min(1, 'Please select a department'),
    position: z.string()
        .min(1, 'Please select a position'),
    salary: z.number()
        .min(30000, 'Salary must be at least $30,000')
        .max(200000, 'Salary must be less than $200,000'),
    dateOfEmployment: z.string()
        .min(1, 'Please select a date of employment')
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
        
        if (!this.employeeId) {
            this.error = 'No employee ID provided';
            return;
        }

        this.isLoading = true;
        try {
            this.employee = store.getState().getEmployee(parseInt(this.employeeId));
            
            if (!this.employee) {
                this.error = 'Employee not found';
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
            this.error = 'Failed to load employee data';
            console.error('Error loading employee:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.form.api.state.canSubmit) {
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
            this.error = 'Failed to update employee';
            console.error('Error updating employee:', error);
            this.stateOfUpdateOfCreate = 'error';
        } finally {
            this.isSubmitting = false;
        }
    }

    handleCancel() {
        Router.go('/');
    }

    render() {
        if (this.isLoading) {
            return html`
                <div class="loading-container">
                    <div class="spinner"></div>
                    <p>Loading employee data...</p>
                </div>
            `;
        }

        if (this.error) {
            return html`
                <div class="error-container">
                    <h2>Error</h2>
                    <p>${this.error}</p>
                    <app-button 
                        label="Go Back" 
                        @click=${this.handleCancel}
                        variant="secondary"
                    ></app-button>
                </div>
            `;
        }

        if (!this.employee) {
            return html`
                <div class="not-found-container">
                    <h2>Employee Not Found</h2>
                    <p>The employee you're looking for doesn't exist.</p>
                    <app-button 
                        label="Go Back" 
                        @click=${this.handleCancel}
                        variant="secondary"
                    ></app-button>
                </div>
            `;
        }

        return html`
            <card-component background="white" statusOfBottomBar=${this.stateOfUpdateOfCreate}>
                <div slot="body" class={edit-employee-container">
                <div class="header">
                    <h2 class="header-title">Edit Employee</h2>
                    <p>Update employee information for ${this.employee.firstName} ${this.employee.lastName}</p>
                </div>

            <div class="form-grid">
                <form @submit=${this.handleSubmit} class="edit-form">

                        ${this.form.field(
                            {
                                name: 'firstName',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value || value.length < 2) {
                                            return 'First name must be at least 2 characters';
                                        }
                                        if (value.length > 50) {
                                            return 'First name must be less than 50 characters';
                                        }
                                        if (!/^[a-zA-Z\s]+$/.test(value)) {
                                            return 'First name can only contain letters and spaces';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="First Name"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
                                    .required=${true}
                                    name="firstName"
                                    placeholder="Enter first name"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'lastName',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value || value.length < 2) {
                                            return 'Last name must be at least 2 characters';
                                        }
                                        if (value.length > 50) {
                                            return 'Last name must be less than 50 characters';
                                        }
                                        if (!/^[a-zA-Z\s]+$/.test(value)) {
                                            return 'Last name can only contain letters and spaces';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="Last Name"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
                                    .required=${true}
                                    name="lastName"
                                    placeholder="Enter last name"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'email',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value) return 'Email is required';
                                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                            return 'Please enter a valid email address';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="Email"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
                                    .required=${true}
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'phone',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value) return 'Phone number is required';
                                        if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
                                            return 'Please enter a valid phone number';
                                        }
                                        if (value.replace(/\D/g, '').length < 10) {
                                            return 'Phone number must be at least 10 digits';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="Phone"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
                                    .required=${true}
                                    name="phone"
                                    placeholder="Enter phone number"
                                    @input=${(e) => field.handleChange(e.currentTarget.value)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'department',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value) return 'Please select a department';
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <input-dropdown
                                    label="Department"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
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
                                    onChange: ({ value }) => {
                                        if (!value) return 'Please select a position';
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <input-dropdown
                                    label="Position"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
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
                                    onChange: ({ value }) => {
                                        if (!value || value < 30000) {
                                            return 'Salary must be at least $30,000';
                                        }
                                        if (value > 200000) {
                                            return 'Salary must be less than $200,000';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="Salary"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
                                    .required=${true}
                                    name="salary"
                                    type="number"
                                    placeholder="Enter salary"
                                    @input=${(e) => field.handleChange(parseInt(e.currentTarget.value) || 0)}
                                ></text-input>
                            `
                        )}

                        ${this.form.field(
                            {
                                name: 'dateOfEmployment',
                                validators: {
                                    onChange: ({ value }) => {
                                        if (!value) return 'Please select a date of employment';
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        if (selectedDate > today) {
                                            return 'Date of employment cannot be in the future';
                                        }
                                        return undefined;
                                    }
                                }
                            },
                            (field) => html`
                                <text-input
                                    label="Date of Employment"
                                    .value=${field.state.value}
                                    .error=${field.state.meta?.errors?.join(', ')}
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
                            label="Cancel"
                            @click=${this.handleCancel}
                            variant="secondary"
                        ></app-button>
                        
                        <app-button
                            label=${this.isSubmitting ? 'Updating...' : 'Update Employee'}
                            @click=${this.handleSubmit}
                            ?disabled=${!this.form.api.state.canSubmit || this.isSubmitting}
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
