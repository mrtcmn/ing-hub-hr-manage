/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {},
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  testMatch: ['**/test/**/*.js'],
};

export default config;
