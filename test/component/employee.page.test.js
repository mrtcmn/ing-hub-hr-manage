import { fixture, assert, html } from '@open-wc/testing';
import { EmployeePage } from '../../src/page/employee.page.js';

suite('EmployeePage Search Functionality', () => {
    let element;

    setup(async () => {
        element = await fixture(html`<employee-page></employee-page>`);
    });

    test('should initialize with empty search query', () => {
        assert.equal(element.searchQuery, '');
        assert.deepEqual(element.filteredEmployees, element.employees);
    });

    test('should filter employees by first name (case insensitive)', async () => {
        // Mock employees data
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' },
            { firstName: 'Bob', lastName: 'Johnson', phone: '5555555555', email: 'bob@example.com' }
        ];

        element.searchQuery = 'john';
        element.requestUpdate();
        await element.updateComplete;
        
        // Should find both "John Doe" and "Bob Johnson" because "john" appears in both
        assert.equal(element.filteredEmployees.length, 2);
        assert.isTrue(element.filteredEmployees.some(e => e.firstName === 'John'));
        assert.isTrue(element.filteredEmployees.some(e => e.lastName === 'Johnson'));

        element.searchQuery = 'JOHN';
        element.requestUpdate();
        await element.updateComplete;
        
        // Same result for uppercase
        assert.equal(element.filteredEmployees.length, 2);
        assert.isTrue(element.filteredEmployees.some(e => e.firstName === 'John'));
        assert.isTrue(element.filteredEmployees.some(e => e.lastName === 'Johnson'));
    });

    test('should filter employees by last name (case insensitive)', async () => {
        element.employees = [
            { firstName: 'Alice', lastName: 'Doe', phone: '1234567890', email: 'alice@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' },
            { firstName: 'Bob', lastName: 'Johnson', phone: '5555555555', email: 'bob@example.com' }
        ];

        element.searchQuery = 'smith';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].lastName, 'Smith');
    });

    test('should filter employees by full name (case insensitive)', async () => {
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' },
            { firstName: 'Bob', lastName: 'Johnson', phone: '5555555555', email: 'bob@example.com' }
        ];

        element.searchQuery = 'john doe';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].firstName, 'John');
        assert.equal(element.filteredEmployees[0].lastName, 'Doe');
    });

    test('should filter employees by phone number', async () => {
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' },
            { firstName: 'Bob', lastName: 'Johnson', phone: '5555555555', email: 'bob@example.com' }
        ];

        element.searchQuery = '123';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].phone, '1234567890');
    });

    test('should filter employees by email', async () => {
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' },
            { firstName: 'Bob', lastName: 'Johnson', phone: '5555555555', email: 'bob@example.com' }
        ];

        element.searchQuery = 'jane@example';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].email, 'jane@example.com');
    });

    test('should handle Turkish characters correctly', async () => {
        element.employees = [
            { firstName: 'Çetin', lastName: 'Özkan', phone: '1234567890', email: 'cetin@example.com' },
            { firstName: 'İrem', lastName: 'Şahin', phone: '0987654321', email: 'irem@example.com' },
            { firstName: 'Irem', lastName: 'Sahin', phone: '5555555555', email: 'irem2@example.com' }
        ];

        // Search with Turkish characters
        element.searchQuery = 'çetin';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].firstName, 'Çetin');

        // Search with normalized characters
        element.searchQuery = 'cetin';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].firstName, 'Çetin');

        // Search with İrem (Turkish I)
        element.searchQuery = 'irem';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 2); // Should find both İrem and Irem

        // Search with Irem (English I)
        element.searchQuery = 'Irem';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 2); // Should find both İrem and Irem
    });

    test('should reset pagination when searching', async () => {
        element.currentPage = 3;
        element.searchQuery = 'test';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.currentPage, 1);
    });

    test('should clear search correctly', async () => {
        element.searchQuery = 'test';
        element.currentPage = 2;
        
        element.clearSearch();
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.searchQuery, '');
        assert.equal(element.currentPage, 1);
        assert.deepEqual(element.filteredEmployees, element.employees);
    });

    test('should handle empty search query', async () => {
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' }
        ];

        element.searchQuery = '';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.deepEqual(element.filteredEmployees, element.employees);
        assert.equal(element.filteredEmployees.length, 2);
    });

    test('should handle whitespace in search query', async () => {
        element.employees = [
            { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com' },
            { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane@example.com' }
        ];

        element.searchQuery = '  john  ';
        element.requestUpdate();
        await element.updateComplete;
        
        assert.equal(element.filteredEmployees.length, 1);
        assert.equal(element.filteredEmployees[0].firstName, 'John');
    });
});
