/* eslint-env node */
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",

  // 全局变量设置
  globals: {
    "import.meta": {
      env: {
        MODE: "test",
      },
    },
  },

  // 模块路径映射 - 正确的选项名
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },

  testMatch: ["**/__tests__/**/*.(js|jsx|ts|tsx)", "**/*.(test|spec).(js|jsx|ts|tsx)"],

  modulePathIgnorePatterns: ["node_modules", ".jest-test-results.json"],

  collectCoverageFrom: [
    "app/components/**/*.{js,jsx,ts,tsx}",
    "!app/components/**/*.stories.{js,jsx,ts,tsx}",
    "!app/components/**/index.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
  ],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],

  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },

  transformIgnorePatterns: ["node_modules/(?!(date-fns|@floating-ui)/)"],

  clearMocks: true,
  verbose: true,
}

module.exports = config
