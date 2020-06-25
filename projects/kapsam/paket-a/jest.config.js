console.log("---------------- LIB Jest.config ---------------");
const jestBaseConfig = require("../../../jest.config.base");
// console.log("jestBaseConfig: ",jestBaseConfig)
/**
 * A list of paths to modules that run some code to configure 
 * or set up the testing framework before each test file in the suite is executed.
 * setupFilesAfterEnv = ['<rootDir>/setupJest.ts']
 */
const setupFilesAfterEnv = [
  ...(jestBaseConfig.setupFilesAfterEnv||[]),
  './setupJestttt.ts'
]; 

module.exports = {
  ...jestBaseConfig,
  rootDir: 'projects/kapsam/paket-a/src',
  // setupFilesAfterEnv:['<rootDir>/../setupJest.ts'],
  //*************************************************** COVERAGE */
  collectCoverage: false,
  //***************************************************** REPORT */
  reporters: ['default']
};
// console.log(module.exports)
console.log("-----------------/LIB Jest.config ---------------");
