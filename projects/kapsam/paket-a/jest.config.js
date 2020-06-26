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
  /**
   * Her testten önce çalışmasını istediğimiz bir script varsa 
   * setupFilesAfterEnv tam bu iş için biçilmiş kaftan.
   * 
   * Eğer ayarlar içinde yukarıdaki kodu açarsak, 
    
        setupFilesAfterEnv:['<rootDir>/setupJest.ts'],
    
   * aşağıdaki komut satırını konsolda çalıştırıp şu ayarları görebiliriz: 

     $ ng test @kapsam/paket-a --showConfig | grep setupFilesAfterEnv -A3      
      "setupFilesAfterEnv": [
        "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\node_modules\\@angular-builders\\jest\\dist\\jest-config\\setup.js",
        "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\projects\\kapsam\\paket-a\\src\\setupJest.ts"
      ],
   * 
   * Yani başlangıçta çalışmasını istediğimiz dosyamız setupJest.ts dosyası listeye eklenmiş.
   * Aynı dosyayı bu kez dizi değil ama string olacak şekilde angular.json içinde aşağıdaki gibi tanımlarsak:
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "setupFilesAfterEnv":"<rootDir>/setupJest.ts",
            "configPath":"./jest.config.js",
            "tsConfig": "tsconfig.spec.json"
          }
        }
   * 
     $ ng test @kapsam/paket-a --showConfig | grep setupFilesAfterEnv -A3
      "setupFilesAfterEnv": [
        "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\projects\\kapsam\\paket-a\\src\\setupJest.ts"
      ],
   */
  // setupFilesAfterEnv:['<rootDir>/setupJest.ts'],
  //*************************************************** COVERAGE */
  collectCoverage: false,
  //***************************************************** REPORT */
  reporters: ['default']
};
// console.log(module.exports)
console.log("-----------------/LIB Jest.config ---------------");
