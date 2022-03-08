import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testPathIgnorePatterns: ["<rootDir>/node_modules"]
};
export default config;