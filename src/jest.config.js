console.log('---------------- APP Jest.config ---------------');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig');
const jestBaseConfig = require('../jest.config.base');
// console.log(jestBaseConfig)
module.exports = {
  ...jestBaseConfig,
  rootDir: './src',
  // testMatch: ['**/+(*.)+(spec).(ts)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  //********************************************************* COVERAGE */
  collectCoverage: false,
  //*********************************************************** REPORT */
  reporters: ['default'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
console.log('-----------------/APP Jest.config ---------------');
