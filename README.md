# Jest İle Angular Kütüphane ve Uygulama Projesini Test Etmek 

# Testin Yapısı



# Sorun Giderme
## `TypeError: Cannot read property 'getComponentFromError' of null` 

Aşağıdaki hata angular projesinde koştuğu için `import 'jest-preset-angular';` satırını içeren `setupJest.ts` (ismi farklı olabilir elbette) dosyasını her test öncesinde çalıştıracak. Böylece kepeğe son!  

```
  ● Servis içeren Servis › should be created

    TypeError: Cannot read property 'getComponentFromError' of null

      at TestBedViewEngine._initIfNeeded (../../packages/core/testing/src/test_bed.ts:378:46)
      at TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:464:10)
      at Function.TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:228:36)
      at Object.<anonymous> (projects/kapsam/paket-a/src/lib/servis_test/servis-iceren.service.spec.ts:18:23)
```

`TypeError: Cannot read property 'getComponentFromError' of null` hatasını alıyorsanız ve 
her testten önce çalışmasını istediğimiz bir script varsa `setupFilesAfterEnv` tam bu iş için biçilmiş kaftan.

Eğer ayarlar içinde yukarıdaki kodu açarsak, `setupFilesAfterEnv:['<rootDir>/setupJest.ts'],` aşağıdaki komut satırını konsolda çalıştırıp şu ayarları görebiliriz: 

```
 $ ng test @kapsam/paket-a --showConfig | grep setupFilesAfterEnv -A3      
  "setupFilesAfterEnv": [
    "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\node_modules\\@angular-builders\\jest\\dist\\jest-config\\setup.js",
    "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\projects\\kapsam\\paket-a\\src\\setupJest.ts"
  ],
```

Yani başlangıçta çalışmasını istediğimiz dosyamız setupJest.ts dosyası listeye eklenmiş.
Aynı dosyayı bu kez dizi değil ama string olacak şekilde angular.json içinde aşağıdaki gibi tanımlarsak:
```
    "test": {
      "builder": "@angular-builders/jest:run",
      "options": {
        "setupFilesAfterEnv":"<rootDir>/setupJest.ts",
        "configPath":"./jest.config.js",
        "tsConfig": "tsconfig.spec.json"
      }
    }
```

```
 $ ng test @kapsam/paket-a --showConfig | grep setupFilesAfterEnv -A3
  "setupFilesAfterEnv": [
    "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\projects\\kapsam\\paket-a\\src\\setupJest.ts"
  ],
```

## `Can't resolve all parameters for ServisIcerenService: (?).` Hatası 

setupFilesAfterEnv ayarını yaptınız ancak `Can't resolve all parameters for ServisIcerenService: (?).` hatasını alıyorsunuz.

```
● Servis içeren Servis › should be created

    Can't resolve all parameters for ServisIcerenService: (?).

      at syntaxError (../packages/compiler/src/util.ts:100:17)
      at CompileMetadataResolver._getDependenciesMetadata (../packages/compiler/src/metadata_resolver.ts:957:27)
      at CompileMetadataResolver._getTypeMetadata (../packages/compiler/src/metadata_resolver.ts:836:20)
      at CompileMetadataResolver._getInjectableTypeMetadata (../packages/compiler/src/metadata_resolver.ts:1089:17)
      at CompileMetadataResolver.getProviderMetadata (../packages/compiler/src/metadata_resolver.ts:1100:16)
      at ../packages/compiler/src/metadata_resolver.ts:1021:38
          at Array.forEach (<anonymous>)
      at CompileMetadataResolver._getProvidersMetadata (../packages/compiler/src/metadata_resolver.ts:981:15)
      at CompileMetadataResolver.getNgModuleMetadata (../packages/compiler/src/metadata_resolver.ts:649:30)
      at JitCompiler._loadModules (../packages/compiler/src/jit/compiler.ts:127:49)
      at JitCompiler._compileModuleAndAllComponents (../packages/compiler/src/jit/compiler.ts:115:32)
      at JitCompiler.compileModuleAndAllComponentsSync (../packages/compiler/src/jit/compiler.ts:65:38)
      at CompilerImpl.compileModuleAndAllComponentsSync (../packages/platform-browser-dynamic/src/compiler_factory.ts:61:35)
      at TestingCompilerImpl.compileModuleAndAllComponentsSync (../../packages/platform-browser-dynamic/testing/src/compiler_factory.ts:52:27)
      at TestBedViewEngine._initIfNeeded (../../packages/core/testing/src/test_bed.ts:376:28)
      at TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:464:10)
      at Function.TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:228:36)
      at projects/kapsam/paket-a/src/lib/servis_test/servis-iceren.service.spec.ts:18:23
```

Bu sorunu gidermek için `jest.config.js` dosyanıza `preset: 'jest-preset-angular',` satırını aşağıdaki gibi ekleyin:

```
module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    "ts-jest": {
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
