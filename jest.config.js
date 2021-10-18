module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "!src/index.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,
  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,
  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],
};
