/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/services/*.ts'],
  coverageDirectory: 'coverage/unit',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  forceExit: true,
  resetMocks: true,
  clearMocks: true,
};
