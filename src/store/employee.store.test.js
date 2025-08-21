import { assert } from '@open-wc/testing';
import store from './employee.store.js';

suite('Employee Store - Uniqueness Validation', () => {
    let originalEmployees;

    setup(() => {
        // Store original employees and reset to initial state
        originalEmployees = store.getState().getAllEmployees();
        store.getState().removeAllEmployees();
    });

    teardown(() => {
        // Restore original employees
        store.getState().removeAllEmployees();
        originalEmployees.forEach(emp => {
            store.getState().addEmployee(emp);
        });
    });

    suite('checkNameUniqueness', () => {
        test('should return false for unique first name + last name combination', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameUniqueness('Jane', 'Smith');

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should return true for duplicate first name + last name combination', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameUniqueness('John', 'Doe');

            // Assert
            assert.isTrue(isDuplicate);
        });

        test('should return false when checking against itself (excludeId)', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const allEmployees = store.getState().getAllEmployees();
            const employeeId = allEmployees[allEmployees.length - 1].id;
            const isDuplicate = store.getState().checkNameUniqueness('John', 'Doe', employeeId);

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should be case insensitive', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameUniqueness('john', 'doe');

            // Assert
            assert.isTrue(isDuplicate);
        });
    });

    suite('checkNameBirthdayUniqueness', () => {
        test('should return false for unique first name + last name + birthday combination', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameBirthdayUniqueness('John', 'Doe', '1990-01-01T00:00:00.000Z');

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should return true for duplicate first name + last name + birthday combination', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameBirthdayUniqueness('John', 'Doe', '1985-03-15T00:00:00.000Z');

            // Assert
            assert.isTrue(isDuplicate);
        });

        test('should return false when checking against itself (excludeId)', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const allEmployees = store.getState().getAllEmployees();
            const employeeId = allEmployees[allEmployees.length - 1].id;
            const isDuplicate = store.getState().checkNameBirthdayUniqueness('John', 'Doe', '1985-03-15T00:00:00.000Z', employeeId);

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should handle null dateOfBirth correctly', () => {
            // Arrange
            const employee1 = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                department: 'Tech',
                position: 'Senior',
                dateOfEmployment: '2022-01-15T00:00:00.000Z',
                dateOfBirth: null
            };

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkNameBirthdayUniqueness('John', 'Doe', null);

            // Assert
            assert.isTrue(isDuplicate);
        });
    });

    suite('checkEmailUniqueness', () => {
        test('should return false for unique email', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkEmailUniqueness('jane.smith@example.com');

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should return true for duplicate email', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkEmailUniqueness('john.doe@example.com');

            // Assert
            assert.isTrue(isDuplicate);
        });

        test('should return false when checking against itself (excludeId)', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const allEmployees = store.getState().getAllEmployees();
            const employeeId = allEmployees[allEmployees.length - 1].id;
            const isDuplicate = store.getState().checkEmailUniqueness('john.doe@example.com', employeeId);

            // Assert
            assert.isFalse(isDuplicate);
        });

        test('should be case insensitive', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            const isDuplicate = store.getState().checkEmailUniqueness('JOHN.DOE@EXAMPLE.COM');

            // Assert
            assert.isTrue(isDuplicate);
        });
    });

    suite('Integration Tests - Creating Duplicate Records', () => {
        test('should detect duplicate when trying to create same record twice', () => {
            // Arrange
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

            // Act - Create first record
            store.getState().addEmployee(employee1);
            
            // Act - Try to create duplicate record
            const nameUniqueness = store.getState().checkNameUniqueness('John', 'Doe');
            const nameBirthdayUniqueness = store.getState().checkNameBirthdayUniqueness('John', 'Doe', '1985-03-15T00:00:00.000Z');
            const emailUniqueness = store.getState().checkEmailUniqueness('john.doe@example.com');

            // Assert
            assert.isTrue(nameUniqueness);
            assert.isTrue(nameBirthdayUniqueness);
            assert.isTrue(emailUniqueness);
        });

        test('should allow different birthday for same name combination', () => {
            // Arrange
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

            // Act
            store.getState().addEmployee(employee1);
            
            // Same name but different birthday should be allowed
            const nameUniqueness = store.getState().checkNameUniqueness('John', 'Doe');
            const nameBirthdayUniqueness = store.getState().checkNameBirthdayUniqueness('John', 'Doe', '1990-01-01T00:00:00.000Z');
            const emailUniqueness = store.getState().checkEmailUniqueness('john.doe.different@example.com');

            // Assert
            assert.isTrue(nameUniqueness); // Name combination exists
            assert.isFalse(nameBirthdayUniqueness); // But with different birthday
            assert.isFalse(emailUniqueness); // And different email
        });

        test('should detect duplicates when creating new employee with existing data (simulating form submission)', () => {
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

            // Act - Simulate form submission for new employee with duplicate data
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

            // Simulate the exact logic from edit-employee.page.js
            const errors = [];
            
            // Check first name + last name combination (without birthday)
            if (store.getState().checkNameUniqueness(
                formData.firstName,
                formData.lastName,
                null // null for new employee
            )) {
                errors.push('first_name_last_name_exists');
            }

            // Check first name + last name + birthday combination
            if (store.getState().checkNameBirthdayUniqueness(
                formData.firstName,
                formData.lastName,
                formData.dateOfBirth,
                null // null for new employee
            )) {
                errors.push('first_name_last_name_birthday_exists');
            }

            // Check email uniqueness
            if (store.getState().checkEmailUniqueness(
                formData.email,
                null // null for new employee
            )) {
                errors.push('email_already_exists');
            }

            // Assert - Should have errors for duplicate data
            assert.isTrue(errors.includes('first_name_last_name_exists'));
            assert.isTrue(errors.includes('first_name_last_name_birthday_exists'));
            assert.isTrue(errors.includes('email_already_exists'));
            assert.equal(errors.length, 3);
        });

        test('should allow new employee with unique data', () => {
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

            // Act - Simulate form submission for new employee with unique data
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

            // Simulate the exact logic from edit-employee.page.js
            const errors = [];
            
            // Check first name + last name combination (without birthday)
            if (store.getState().checkNameUniqueness(
                formData.firstName,
                formData.lastName,
                null // null for new employee
            )) {
                errors.push('first_name_last_name_exists');
            }

            // Check first name + last name + birthday combination
            if (store.getState().checkNameBirthdayUniqueness(
                formData.firstName,
                formData.lastName,
                formData.dateOfBirth,
                null // null for new employee
            )) {
                errors.push('first_name_last_name_birthday_exists');
            }

            // Check email uniqueness
            if (store.getState().checkEmailUniqueness(
                formData.email,
                null // null for new employee
            )) {
                errors.push('email_already_exists');
            }

            // Assert - Should have no errors for unique data
            assert.equal(errors.length, 0);
        });
    });
});
