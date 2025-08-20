import {configureLocalization} from '@lit/localize';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['tr'],
  loadLocale: (locale) => import(`./${locale}.js`),
});

export const locales = ['en', 'tr'];
export const defaultLocale = 'en';

export const messages = {
  'home': 'Home',
  'users': 'Users',
  'employee': 'Employee',
  'employee_list': 'Employee List',
  'add_employee': 'Add Employee',
  'edit_employee': 'Edit Employee',
  'delete_employee': 'Delete Employee',
  'name': 'Name',
  'first_name': 'First Name',
  'last_name': 'Last Name',
  'date_of_employment': 'Date of Employment',
  'phone': 'Phone',
  'email': 'Email',
  'position': 'Position',
  'department': 'Department',
  'salary': 'Salary',
  'hire_date': 'Hire Date',
  'actions': 'Actions',
  'save': 'Save',
  'cancel': 'Cancel',
  'search': 'Search',
  'filter': 'Filter',
  'no_employees': 'No employees found',
  'loading': 'Loading...',
  'error': 'Error',
  'success': 'Success',
  'confirm_delete': 'Are you sure you want to delete?',
  'yes': 'Yes',
  'no': 'No',
  'list_view': 'List View',
  'grid_view': 'Grid View',
  'edit': 'Edit',
  'delete': 'Delete'
};
