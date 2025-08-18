import { createStore } from 'zustand/vanilla';

export const DEPARTMENTS = ['Analytics', 'Tech'];
export const POSITIONS = ['Junior', 'Medior', 'Senior'];

const store = createStore((set, get) => ({
    employees: [{
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        department: 'Analytics',
    }],

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
