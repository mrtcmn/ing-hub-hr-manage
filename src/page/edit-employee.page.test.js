import { assert, fixture, html } from '@open-wc/testing';
import { EditEmployeePage } from './edit-employee.page.js';
import store from '../store/employee.store.js';

suite('EditEmployeePage - Uniqueness Validation', () => {
    let element;
    let originalEmployees;

    setup(async () => {
        // Store original employees and reset to initial state
        originalEmployees = store.getState().getAllEmployees();
        store.getState().removeAllEmployees();
        
        // Create the component
        element = await fixture(html`<edit-employee-page></edit-employee-page>`);
        
        // Wait for component to be ready
        await element.updateComplete;
    });

    teardown(() => {
        // Restore original employees
        store.getState().removeAllEmployees();
        originalEmployees.forEach(emp => {
            store.getState().addEmployee(emp);
        });
    });

    test('should prevent creating duplicate employee with same name and email', async () => {
        // Arrange - Create first employee
        const employee1 = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };
        store.getState().addEmployee(employee1);

        // Set employeeId to 'new' to simulate creating new employee
        element.employeeId = 'new';

        // Simulate form data with duplicate information
        const formData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '0987654321', // Different phone
            department: 'Analytics', // Different department
            position: 'Junior', // Different position
            dateOfEmployment: '2023-01-15T00:00:00.000Z', // Different employment date
            dateOfBirth: '1985-03-15T00:00:00.000Z' // Same birthday
        };

        // Mock the form state
        element.form = {
            api: {
                state: {
                    values: formData,
                    canSubmit: true,
                    isDirty: true
                }
            }
        };

        // Act - Call checkUniqueness directly
        const errors = element.checkUniqueness(formData);

        // Assert - Should have errors for duplicate data
        assert.isTrue(errors.includes('first_name_last_name_exists'));
        assert.isTrue(errors.includes('first_name_last_name_birthday_exists'));
        assert.isTrue(errors.includes('email_already_exists'));
        assert.equal(errors.length, 3);
    });

    test('should allow creating employee with unique data', async () => {
        // Arrange - Create first employee
        const employee1 = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };
        store.getState().addEmployee(employee1);

        // Set employeeId to 'new' to simulate creating new employee
        element.employeeId = 'new';

        // Simulate form data with unique information
        const formData = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            department: 'Analytics',
            position: 'Junior',
            dateOfEmployment: '2023-01-15T00:00:00.000Z',
            dateOfBirth: '1990-01-01T00:00:00.000Z'
        };

        // Mock the form state
        element.form = {
            api: {
                state: {
                    values: formData,
                    canSubmit: true,
                    isDirty: true
                }
            }
        };

        // Act - Call checkUniqueness directly
        const errors = element.checkUniqueness(formData);

        // Assert - Should have no errors for unique data
        assert.equal(errors.length, 0);
    });

    test('should allow editing existing employee with same data (excludeId)', async () => {
        // Arrange - Create employee
        const employee1 = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };
        const addedEmployee = store.getState().addEmployee(employee1);
        const allEmployees = store.getState().getAllEmployees();
        const employeeId = allEmployees[allEmployees.length - 1].id;

        // most important ones => 
        element.employeeId = employeeId.toString();

        // Simulate form data with same information (editing)
        const formData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };

        // Mock the form state
        element.form = {
            api: {
                state: {
                    values: formData,
                    canSubmit: true,
                    isDirty: true
                }
            }
        };

        const errors = element.checkUniqueness(formData);

        assert.equal(errors.length, 0);
    });

    test('should detect duplicates when editing employee with data from another employee', async () => {
        // Arrange - Create two employees
        const employee1 = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };
        const employee2 = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            department: 'Analytics',
            position: 'Junior',
            dateOfEmployment: '2023-01-15T00:00:00.000Z',
            dateOfBirth: '1990-01-01T00:00:00.000Z'
        };
        
        store.getState().addEmployee(employee1);
        const addedEmployee2 = store.getState().addEmployee(employee2);
        const allEmployees = store.getState().getAllEmployees();

        // Bu i must to find better solution
        const employee2Id = allEmployees[allEmployees.length - 1].id;

        // Set employeeId to second employee (editing Jane Smith)
        element.employeeId = employee2Id.toString();

        const formData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '0987654321',
            department: 'Analytics',
            position: 'Junior',
            dateOfEmployment: '2023-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        };

        // Mock the form state
        element.form = {
            api: {
                state: {
                    values: formData,
                    canSubmit: true,
                    isDirty: true
                }
            }
        };

        // Act - Call checkUniqueness directly
        const errors = element.checkUniqueness(formData);

        // Assert - Should have errors for duplicate data
        assert.isTrue(errors.includes('first_name_last_name_exists'));
        assert.isTrue(errors.includes('first_name_last_name_birthday_exists'));
        assert.isTrue(errors.includes('email_already_exists'));
        assert.equal(errors.length, 3);
    });
});
