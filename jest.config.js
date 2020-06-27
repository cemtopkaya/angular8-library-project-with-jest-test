console.log('---------------- ROOT Jest.config ---------------');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const jestBaseConfig = require('./jest.config.base');
// console.log(jestBaseConfig)
module.exports = {
  ...jestBaseConfig,
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  //********************************************************* COVERAGE */
  collectCoverage: true,
  //*********************************************************** REPORT */
  reporters: ['default'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
console.log('-----------------/ROOT Jest.config ---------------');
