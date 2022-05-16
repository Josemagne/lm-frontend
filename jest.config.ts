import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  preset: "ts-jest",
  modulePathIgnorePatterns: ["<rootDir>/lm-components/", "<rootDir>/dist, <rootDir>/build"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  setupFiles: ["<rootDir>/src/browserMocks.ts",],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest"
  },
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "test-coverage",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
export default config;
