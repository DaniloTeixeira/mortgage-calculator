module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [ '<rootDir>/setup-jest.ts' ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@components/(.*)$': '<rootDir>/src/app/core/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/app/core/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/app/core/services/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/app/core/interfaces/$1',
    '^@constants/(.*)$': '<rootDir>/src/app/core/constants/$1',
  },
};

