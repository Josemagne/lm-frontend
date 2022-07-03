import { resolve } from "path"

const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: false,
  },
  globals: {
    cy: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      resolve(__dirname, "./tsconfig.json"),
      resolve(__dirname, "./tsconfig.eslint.json"),
    ],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react/prop-types": RULES.OFF,
    "react/react-in-jsx-scope": RULES.OFF,
    "@typescript-eslint/ban-ts-ignore": RULES.OFF,
    "@typescript-eslint/ban-ts-comment": RULES.OFF,
    "@typescript-eslint/no-unsafe-member-access": RULES.OFF,
    "@typescript-eslint/no-unsafe-return": RULES.OFF,
    "@typescript-eslint/no-unsafe-argument": RULES.OFF,
    "@typescript-eslint/no-unsafe-assignment": RULES.OFF,
    "@typescript-eslint/no-empty-function": RULES.OFF,
    "@typescript-eslint/no-unsafe-call": RULES.OFF,
    "@typescript-eslint/restrict-template-expressions": RULES.OFF,
    "@typescript-eslint/no-explicit-any": RULES.OFF,
    "@typescript-eslint/no-unused-vars": RULES.OFF,
    "@typescript-exlint/no-floating-promises": RULES.OFF,
    "@typescript-eslint/no-inferrable-types": RULES.OFF,
    "@typescript-eslint/restrict-plus-operands": RULES.OFF,
    "@typescript-eslint/no-misused-promises": RULES.OFF,
    "@typescript-eslint/ban-types": RULES.OFF,
  },
  ignorePatterns: [".eslintrc.js"],
}
