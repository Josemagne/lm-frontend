import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  preset: "ts-jest",
  modulePathIgnorePatterns: ["<rootDir>/lm-components/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  setupFiles: ["<rootDir>/src/browserMocks.ts"],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
export default config;
