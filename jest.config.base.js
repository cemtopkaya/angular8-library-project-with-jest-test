console.log("---------------- BASE Jest.base.config ---------------");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");
module.exports = {
  globals: {
    "ts-jest": {
      allowSyntheticDefaultImports: true,
      // tsConfig: "tsconfig.spec.json",
      stringifyContentPathRegex: '\\.html$',
      // astTransformers: [
      //     require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')
      // ],
      "no-cache": true
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  // preset: 'jest-preset-angular',
  roots: ["<rootDir>/"],
  // transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  testMatch: ["**/+(*.)+(spec).(ts)?(x)"],
  // "setupFilesAfterEnv": ["<rootDir>/src/setupJest.ts"],
  //********************************************************* COVERAGE */
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "coverage/my-app",
  coveragePathIgnorePatterns: [
      "node_modules",
      "test-config",
      "<rootDir>/src/app/interfaces",
      "jestGlobalMocks.ts",
      ".module.ts",
      "<rootDir>/src/app/main.ts"
  ],
  //*********************************************************** REPORT */
  reporters: ['default'],
  // setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  /**
    Aşağıdaki hatayı çözmek için bir yeri ignore etmemiz gerekiyor
  The name `@cinar/cn-nssf-api` was looked up in the Haste module map. It cannot be resolved, because there exists several different files, or packages, that provide a module for that particular name and platform. The platform is generic (no extension). You must delete or blacklist files until there remains only one of these:

      * `C:\Users\cem.topkaya\git\gui_nef_nrf_nssf\dist\cinar\cn-nssf-api\package.json` (package)
      * `C:\Users\cem.topkaya\git\gui_nef_nrf_nssf\projects\cinar\cn-nssf-api\package.json` (package)
   */
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  modulePaths: ["<rootDir>/node_modules"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
};

// console.log(">>>>>>> ",compilerOptions)
//  console.log(">>>>>>> ",module.exports.moduleNameMapper)
console.log("-----------------/BASE Jest.base.config---------------");
