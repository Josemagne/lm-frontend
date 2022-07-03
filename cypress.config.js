const { defineConfig } = require("cypress")
const webpackConfig = require("./webpack.config.js")

module.exports = defineConfig({
  chromeWebSecurity: true,
  video: false,
  component: {
    fileServerFolder: "./src",
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    supportFile: "cypress/support/index.ts",
    specPattern: "src/**/*.test.tsx",
    port: 8087,
  },
  e2e: {
    baseUrl: "http://localhost:8087",
    specPattern: "cypress/e2e/**/*.spec.tsx",
    port: 8087,
  },
  env: {
    api: "http://localhost:4000/api/v1",
  },
})
