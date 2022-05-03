import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    modulePathIgnorePatterns: ["<rootDir>/lm-components/"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
   roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
};
export default config;
