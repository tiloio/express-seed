module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/test/test-setup.ts"],
  globalSetup: "<rootDir>/src/test/global-setup.ts",
  globalTeardown : "<rootDir>/src/test/global-Teardown.ts"
};
