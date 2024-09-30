// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [ '<rootDir>/setup-jest.ts' ],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: [ '**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)' ],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
};