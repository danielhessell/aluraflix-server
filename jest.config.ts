import { pathsToModuleNameMapper } from 'ts-jest/utils';

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@modules/*': ['modules/*'],
      '@config/*': ['config/*'],
      '@infra/*': ['infra/*'],
      '@shared/*': ['shared/*'],
    },
    {
      prefix: '<rootDir>/src/',
    },
  ),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
