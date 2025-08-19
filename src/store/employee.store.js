import { createStore } from 'zustand/vanilla';

export const DEPARTMENTS = ['Analytics', 'Tech', 'Marketing', 'Sales', 'HR'];
export const POSITIONS = ['Junior', 'Medior', 'Senior', 'Lead', 'Manager'];

const store = createStore((set, get) => ({
    employees: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            department: 'Analytics',
            position: 'Senior',
            salary: 75000,
            hireDate: '2022-01-15'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            department: 'Tech',
            position: 'Lead',
            salary: 85000,
            hireDate: '2021-06-20'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            phone: '5551234567',
            department: 'Marketing',
            position: 'Medior',
            salary: 65000,
            hireDate: '2023-03-10'
        }
    ],

    addEmployee: (newEmployee) => set(state => ({
        employees: [...state.employees, { ...newEmployee, id: Date.now() }]
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
    }
}));

export default store;
