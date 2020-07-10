console.log("---------------- BASE Jest.base.config ---------------");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");
module.exports = {
  /**
   * https://jestjs.io/docs/en/configuration#preset-string
   * preset, Jest yapılandırması için temel olarak kullanılan bir ön ayar.
   * Bir ön ayar, kökte bir jest-preset.json veya jest-preset.js dosyasına sahip bir npm modülüne işaret etmelidir.
   * jest-preset-angular Paketindeki ayarlar ile başlatıyoruz
       preset: 'jest-preset-angular',  
   */
  preset: 'jest-preset-angular',
  globals: {
    "ts-jest": {
      allowSyntheticDefaultImports: true,
      /**
       * tsconfig bilgisini ister angular.json içinde de tayin edilebilir 
               "test": {
                 "builder": "@angular-builders/jest:run",
                 "options": {
                   "configPath":"./src/jest.config.js",
                   "tsConfig": "tsconfig.spec.json"
                 }
               },

       * veya ilgili paketin olduğu klasördeki jest.config.js dosyasında belirtebiliriz.
         globals: {
            "ts-jest": {
                tsConfig: "tsconfig.spec.json",
       */
      stringifyContentPathRegex: '\\.html$',
      // astTransformers: [
      //   require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer'),
      //   "jest-preset-angular/build/InlineFilesTransformer",
      //   "jest-preset-angular/build/StripStylesTransformer"
      // ],
      "no-cache": true
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  roots: ["<rootDir>/"],
  /**
   * https://jestjs.io/docs/en/configuration#transformignorepatterns-arraystring
   * Eğer typescript -> javascript dönüşümü (transpile) yapmak istemiyorsanız :
   // transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
   */
  testMatch: ["**/+(*.)+(spec).(ts)?(x)"],
  /**
   * setupTestFrameworkScriptFile yerini setupFilesAfterEnv özelliğine bırakmıştır.
   * Paketteki her test dosyası yürütülmeden önce test çerçevesini yapılandırmak 
   * veya ayarlamak için bazı kodlar çalıştıran modüllerin yollarının listesi. 
   * SetupFiles, test çerçevesi ortama yüklenmeden önce yürütüldüğünden, bu komut dosyası, 
   * test çerçevesi ortama yüklendikten hemen sonra bazı kodları çalıştırma fırsatı sunar.
   * Birden fazla dosyayı testlerin başında çalıştırabilmek için dizi tipinde değer alır.
        "setupFilesAfterEnv": ["<rootDir>/src/setupJest.ts"],
   */
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
