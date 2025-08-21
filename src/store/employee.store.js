import { createStore } from 'zustand/vanilla';

export const DEPARTMENTS = ['Analytics', 'Tech'];
export const POSITIONS = ['Junior', 'Medior', 'Senior'];

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
            position: 'Senior',
            dateOfEmployment: '2021-06-20T00:00:00.000Z',
            dateOfBirth: '1988-07-22T00:00:00.000Z'
        },
        {
            id: 3,
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike.johnson@example.com',
            phone: '5551234567',
            department: 'Tech',
            position: 'Medior',
            dateOfEmployment: '2023-03-10T00:00:00.000Z',
            dateOfBirth: '1990-11-08T00:00:00.000Z'
        },
        {
            id: 4,
            firstName: 'Sarah',
            lastName: 'Wilson',
            email: 'sarah.wilson@example.com',
            phone: '5559876543',
            department: 'Analytics',
            position: 'Senior',
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
            dateOfEmployment: '2023-09-01T00:00:00.000Z',
            dateOfBirth: '1995-09-25T00:00:00.000Z'
        },
        {
            id: 6,
            firstName: 'Emily',
            lastName: 'Davis',
            email: 'emily.davis@example.com',
            phone: '5557890123',
            department: 'Tech',
            position: 'Medior',
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
            position: 'Senior',
            dateOfEmployment: '2021-12-10T00:00:00.000Z',
            dateOfBirth: '1983-12-05T00:00:00.000Z'
        },
        {
            id: 8,
            firstName: 'Lisa',
            lastName: 'Anderson',
            email: 'lisa.anderson@example.com',
            phone: '5556543210',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2020-05-15T00:00:00.000Z',
            dateOfBirth: '1980-06-18T00:00:00.000Z'
        },
        {
            id: 9,
            firstName: 'James',
            lastName: 'Martinez',
            email: 'james.martinez@example.com',
            phone: '5550123456',
            department: 'Analytics',
            position: 'Junior',
            dateOfEmployment: '2023-01-15T00:00:00.000Z',
            dateOfBirth: '1993-08-14T00:00:00.000Z'
        },
        {
            id: 10,
            firstName: 'Amanda',
            lastName: 'Thompson',
            email: 'amanda.thompson@example.com',
            phone: '5551234567',
            department: 'Tech',
            position: 'Medior',
            dateOfEmployment: '2022-04-20T00:00:00.000Z',
            dateOfBirth: '1989-05-25T00:00:00.000Z'
        },
        {
            id: 11,
            firstName: 'Christopher',
            lastName: 'Lee',
            email: 'christopher.lee@example.com',
            phone: '5552345678',
            department: 'Analytics',
            position: 'Senior',
            dateOfEmployment: '2021-09-10T00:00:00.000Z',
            dateOfBirth: '1984-11-30T00:00:00.000Z'
        },
        {
            id: 12,
            firstName: 'Jessica',
            lastName: 'White',
            email: 'jessica.white@example.com',
            phone: '5553456789',
            department: 'Tech',
            position: 'Junior',
            dateOfEmployment: '2023-02-28T00:00:00.000Z',
            dateOfBirth: '1996-03-12T00:00:00.000Z'
        },
        {
            id: 13,
            firstName: 'Michael',
            lastName: 'Harris',
            email: 'michael.harris@example.com',
            phone: '5554567890',
            department: 'Analytics',
            position: 'Medior',
            dateOfEmployment: '2022-07-05T00:00:00.000Z',
            dateOfBirth: '1991-07-18T00:00:00.000Z'
        },
        {
            id: 14,
            firstName: 'Nicole',
            lastName: 'Clark',
            email: 'nicole.clark@example.com',
            phone: '5555678901',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2020-11-15T00:00:00.000Z',
            dateOfBirth: '1982-12-03T00:00:00.000Z'
        },
        {
            id: 15,
            firstName: 'Daniel',
            lastName: 'Lewis',
            email: 'daniel.lewis@example.com',
            phone: '5556789012',
            department: 'Analytics',
            position: 'Junior',
            dateOfEmployment: '2023-05-20T00:00:00.000Z',
            dateOfBirth: '1997-01-08T00:00:00.000Z'
        },
        {
            id: 16,
            firstName: 'Rachel',
            lastName: 'Walker',
            email: 'rachel.walker@example.com',
            phone: '5557890123',
            department: 'Tech',
            position: 'Medior',
            dateOfEmployment: '2022-03-12T00:00:00.000Z',
            dateOfBirth: '1990-06-22T00:00:00.000Z'
        },
        {
            id: 17,
            firstName: 'Kevin',
            lastName: 'Hall',
            email: 'kevin.hall@example.com',
            phone: '5558901234',
            department: 'Analytics',
            position: 'Senior',
            dateOfEmployment: '2021-08-08T00:00:00.000Z',
            dateOfBirth: '1986-04-15T00:00:00.000Z'
        },
        {
            id: 18,
            firstName: 'Michelle',
            lastName: 'Young',
            email: 'michelle.young@example.com',
            phone: '5559012345',
            department: 'Tech',
            position: 'Junior',
            dateOfEmployment: '2023-06-30T00:00:00.000Z',
            dateOfBirth: '1994-10-11T00:00:00.000Z'
        },
        {
            id: 19,
            firstName: 'Steven',
            lastName: 'King',
            email: 'steven.king@example.com',
            phone: '5551234567',
            department: 'Tech',
            position: 'Senior',
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
            dateOfEmployment: '2021-11-15T00:00:00.000Z',
            dateOfBirth: '1982-06-25T00:00:00.000Z'
        },
        {
            id: 22,
            firstName: 'Stephanie',
            lastName: 'Baker',
            email: 'stephanie.baker@example.com',
            phone: '5554567890',
            department: 'Tech',
            position: 'Senior',
            dateOfEmployment: '2020-12-01T00:00:00.000Z',
            dateOfBirth: '1981-01-12T00:00:00.000Z'
        }
    ],

    addEmployee: (newEmployee) => set(state => {
        // Find the highest existing ID and increment by 1
        const maxId = Math.max(...state.employees.map(emp => emp.id), 0);
        const newId = maxId + 1;
        
        return {
            employees: [...state.employees, { 
                ...newEmployee, 
                id: newId,
                dateOfBirth: newEmployee.dateOfBirth ? new Date(newEmployee.dateOfBirth).toISOString() : null
            }]
        };
    }),

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
