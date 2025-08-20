import { createStore } from 'zustand/vanilla';

export const DEPARTMENTS = ['Analytics', 'Tech', 'Marketing', 'Sales', 'HR'];
export const POSITIONS = ['Junior', 'Medior', 'Senior', 'Lead', 'Manager'];

const store = createStore((set, get) => ({
    employees: [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Analytics',
            position: 'Senior',
            salary: 75000,
            dateOfEmployment: '2022-01-15T00:00:00.000Z',
            dateOfBirth: '1985-03-15T00:00:00.000Z'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            department: 'Tech',
            position: 'Lead',
            salary: 85000,
            dateOfEmployment: '2021-06-20T00:00:00.000Z',
            dateOfBirth: '1988-07-22T00:00:00.000Z'
        },
        {
            id: 3,
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike.johnson@example.com',
            phone: '5551234567',
            department: 'Marketing',
            position: 'Medior',
            salary: 65000,
            dateOfEmployment: '2023-03-10T00:00:00.000Z',
            dateOfBirth: '1990-11-08T00:00:00.000Z'
        },
        {
            id: 4,
            firstName: 'Sarah',
            lastName: 'Wilson',
            email: 'sarah.wilson@example.com',
            phone: '5559876543',
            department: 'Sales',
            position: 'Senior',
            salary: 70000,
            dateOfEmployment: '2022-08-15T00:00:00.000Z',
            dateOfBirth: '1987-04-12T00:00:00.000Z'
        },
        {
            id: 5,
            firstName: 'David',
            lastName: 'Brown',
            email: 'david.brown@example.com',
            phone: '5554567890',
            department: 'Tech',
            position: 'Junior',
            salary: 55000,
            dateOfEmployment: '2023-09-01T00:00:00.000Z',
            dateOfBirth: '1995-09-25T00:00:00.000Z'
        },
        {
            id: 6,
            firstName: 'Emily',
            lastName: 'Davis',
            email: 'emily.davis@example.com',
            phone: '5557890123',
            department: 'HR',
            position: 'Medior',
            salary: 60000,
            dateOfEmployment: '2022-11-20T00:00:00.000Z',
            dateOfBirth: '1992-01-30T00:00:00.000Z'
        },
        {
            id: 7,
            firstName: 'Robert',
            lastName: 'Taylor',
            email: 'robert.taylor@example.com',
            phone: '5553210987',
            department: 'Analytics',
            position: 'Lead',
            salary: 80000,
            dateOfEmployment: '2021-12-10T00:00:00.000Z',
            dateOfBirth: '1983-12-05T00:00:00.000Z'
        },
        {
            id: 8,
            firstName: 'Lisa',
            lastName: 'Anderson',
            email: 'lisa.anderson@example.com',
            phone: '5556543210',
            department: 'Marketing',
            position: 'Manager',
            salary: 90000,
            dateOfEmployment: '2020-05-15T00:00:00.000Z',
            dateOfBirth: '1980-06-18T00:00:00.000Z'
        },
        {
            id: 9,
            firstName: 'James',
            lastName: 'Martinez',
            email: 'james.martinez@example.com',
            phone: '5550123456',
            department: 'Sales',
            position: 'Junior',
            salary: 50000,
            dateOfEmployment: '2023-06-01T00:00:00.000Z',
            dateOfBirth: '1997-02-14T00:00:00.000Z'
        },
        {
            id: 10,
            firstName: 'Amanda',
            lastName: 'Garcia',
            email: 'amanda.garcia@example.com',
            phone: '5552345678',
            department: 'Tech',
            position: 'Senior',
            salary: 75000,
            dateOfEmployment: '2022-03-20T00:00:00.000Z',
            dateOfBirth: '1986-10-03T00:00:00.000Z'
        },
        {
            id: 11,
            firstName: 'Christopher',
            lastName: 'Lee',
            email: 'christopher.lee@example.com',
            phone: '5558765432',
            department: 'Analytics',
            position: 'Medior',
            salary: 65000,
            dateOfEmployment: '2023-01-10T00:00:00.000Z',
            dateOfBirth: '1991-05-20T00:00:00.000Z'
        },
        {
            id: 12,
            firstName: 'Jessica',
            lastName: 'Rodriguez',
            email: 'jessica.rodriguez@example.com',
            phone: '5553456789',
            department: 'HR',
            position: 'Senior',
            salary: 70000,
            dateOfEmployment: '2021-09-05T00:00:00.000Z',
            dateOfBirth: '1989-08-27T00:00:00.000Z'
        },
        {
            id: 13,
            firstName: 'Michael',
            lastName: 'White',
            email: 'michael.white@example.com',
            phone: '5555678901',
            department: 'Marketing',
            position: 'Junior',
            salary: 52000,
            dateOfEmployment: '2023-07-15T00:00:00.000Z',
            dateOfBirth: '1996-03-11T00:00:00.000Z'
        },
        {
            id: 14,
            firstName: 'Ashley',
            lastName: 'Thompson',
            email: 'ashley.thompson@example.com',
            phone: '5556789012',
            department: 'Sales',
            position: 'Medior',
            salary: 62000,
            dateOfEmployment: '2022-12-01T00:00:00.000Z',
            dateOfBirth: '1993-07-09T00:00:00.000Z'
        },
        {
            id: 15,
            firstName: 'Daniel',
            lastName: 'Clark',
            email: 'daniel.clark@example.com',
            phone: '5557890123',
            department: 'Tech',
            position: 'Lead',
            salary: 82000,
            dateOfEmployment: '2021-04-20T00:00:00.000Z',
            dateOfBirth: '1984-11-16T00:00:00.000Z'
        },
        {
            id: 16,
            firstName: 'Nicole',
            lastName: 'Lewis',
            email: 'nicole.lewis@example.com',
            phone: '5558901234',
            department: 'Analytics',
            position: 'Junior',
            salary: 54000,
            dateOfEmployment: '2023-10-01T00:00:00.000Z',
            dateOfBirth: '1998-01-05T00:00:00.000Z'
        },
        {
            id: 17,
            firstName: 'Kevin',
            lastName: 'Hall',
            email: 'kevin.hall@example.com',
            phone: '5559012345',
            department: 'Marketing',
            position: 'Senior',
            salary: 72000,
            dateOfEmployment: '2022-06-15T00:00:00.000Z',
            dateOfBirth: '1988-12-22T00:00:00.000Z'
        },
        {
            id: 18,
            firstName: 'Rachel',
            lastName: 'Young',
            email: 'rachel.young@example.com',
            phone: '5550123456',
            department: 'HR',
            position: 'Junior',
            salary: 48000,
            dateOfEmployment: '2023-11-01T00:00:00.000Z',
            dateOfBirth: '1999-04-08T00:00:00.000Z'
        },
        {
            id: 19,
            firstName: 'Steven',
            lastName: 'King',
            email: 'steven.king@example.com',
            phone: '5551234567',
            department: 'Sales',
            position: 'Manager',
            salary: 95000,
            dateOfEmployment: '2020-08-10T00:00:00.000Z',
            dateOfBirth: '1978-09-30T00:00:00.000Z'
        },
        {
            id: 20,
            firstName: 'Melissa',
            lastName: 'Scott',
            email: 'melissa.scott@example.com',
            phone: '5552345678',
            department: 'Tech',
            position: 'Medior',
            salary: 68000,
            dateOfEmployment: '2022-02-28T00:00:00.000Z',
            dateOfBirth: '1990-03-17T00:00:00.000Z'
        },
        {
            id: 21,
            firstName: 'Andrew',
            lastName: 'Green',
            email: 'andrew.green@example.com',
            phone: '5553456789',
            department: 'Analytics',
            position: 'Senior',
            salary: 78000,
            dateOfEmployment: '2021-11-15T00:00:00.000Z',
            dateOfBirth: '1982-06-25T00:00:00.000Z'
        },
        {
            id: 22,
            firstName: 'Stephanie',
            lastName: 'Baker',
            email: 'stephanie.baker@example.com',
            phone: '5554567890',
            department: 'Marketing',
            position: 'Lead',
            salary: 85000,
            dateOfEmployment: '2020-12-01T00:00:00.000Z',
            dateOfBirth: '1981-01-12T00:00:00.000Z'
        }
    ],

    addEmployee: (newEmployee) => set(state => ({
        employees: [...state.employees, { 
            ...newEmployee, 
            id: Date.now(),
            dateOfBirth: newEmployee.dateOfBirth ? new Date(newEmployee.dateOfBirth).toISOString() : null
        }]
    })),

    removeEmployee: (id) => set(state => ({
        employees: state.employees.filter(emp => emp.id !== id)
    })),

    editEmployee: (id, updatedEmployee) => set(state => ({
        employees: state.employees.map(emp =>
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
        )
    })),

    getEmployee: (id) => {
        const state = get();
        return state.employees.find(emp => emp.id === id);
    },

    removeAllEmployees: () => set(() => ({ employees: [] })),

    getAllEmployees: () => {
        const state = get();
        return state.employees;
    },

    // Check if first name + last name + birthday combination already exists
    checkNameBirthdayUniqueness: (firstName, lastName, dateOfBirth, excludeId = null) => {
        const state = get();
        return state.employees.some(emp => {
            if (excludeId && emp.id === excludeId) return false;
            
            // Check if first name, last name, and birthday match
            const empBirthday = emp.dateOfBirth ? new Date(emp.dateOfBirth).toDateString() : null;
            const newBirthday = dateOfBirth ? new Date(dateOfBirth).toDateString() : null;
            
            return emp.firstName.toLowerCase() === firstName.toLowerCase() &&
                   emp.lastName.toLowerCase() === lastName.toLowerCase() &&
                   empBirthday === newBirthday;
        });
    },

    // Check if email already exists
    checkEmailUniqueness: (email, excludeId = null) => {
        const state = get();
        return state.employees.some(emp => {
            if (excludeId && emp.id === excludeId) return false;
            return emp.email.toLowerCase() === email.toLowerCase();
        });
    },

    // Check if first name + last name combination already exists (without birthday)
    checkNameUniqueness: (firstName, lastName, excludeId = null) => {
        const state = get();
        return state.employees.some(emp => {
            if (excludeId && emp.id === excludeId) return false;
            
            return emp.firstName.toLowerCase() === firstName.toLowerCase() &&
                   emp.lastName.toLowerCase() === lastName.toLowerCase();
        });
    }
}));

export default store;
