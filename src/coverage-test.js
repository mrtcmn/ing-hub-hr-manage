// This file imports all source files to ensure coverage measurement
import './root.element.js';
import './page/employee.page.js';
import './store/employee.store.js';
import './utils/localization.js';
import './component/input.component.js';
import './component/navbar.component.js';
import './component/locale-picker.component.js';

// Simple test to ensure the file is executed
suite('Coverage Test', () => {
  test('should import all source files', () => {
    // This test ensures all files are loaded for coverage measurement
    // No assertion needed, just importing files for coverage
  });
});
