# Jest İle Angular Kütüphane ve Uygulama Projesini (çoklu proje - multi project) Test Etmek 

## Kim İçin?

Angular 8.3.26 versiyonu ve jest ile ts-jest'in 26 sürümü için hazırladım.

## Jest Ayarları

### configPath

`configPath` değerini `angular.json` içinde verilebilinir veya jest komut satırında tetiklenirken `--configPath` diye anahtar olarak verilebilinir.

```
  "test": {////
    "builder": "@angular-builders/jest:run",
    "options": {
      "configPath":"./src/jest.config.js",
      "tsConfig": "tsconfig.spec.json"
    }
  },
```

### showConfig

Jest ayarlarının ne olduğunu görmek için `ng test --showConfig` veya `npx jest --showConfig` komutlarını çalıştırabiliriz.

### allowJs Ayarı

TypeScript ve JavaScript dosyaları (.ts, .tsx, .js ve .jsx) ts-jest tarafından işlenir. tsconfig.json dosyanızda "allowJs": true olarak ayarlamanız gerekir.

### baseUrl
Modül kavramını daha iyi anladığımıza göre Typescript ile bir modülü derlediğimizde compiler için yardımcı tsconfig.json parametrelerini tanıyalım. Bunlar paths ve baseUrl özellikleridir. Kestirmeden diyebiliriz ki; paths özelliği kullanılıyorsa baseUrl muhakkak kullanılacak. Typescript projesindeki dosyaların aynı dizin yapısında derlenmiş çıktıları oluşturulmayabilir. Yani girdiler ile çıktılar farklı dizinlerde olabilirler. baseUrl Sayesinde girdilerin olduğu göreceli dizinin yolu tarif edilir. AMD modül sisteminde girdiler tek bir dosya olacak şekilde çıktı oluşturulurken girdi dosyaların görece konumları baseUrl sayesinde belirtilmiş olur. Yani baseUrl ayarı derleyiciye modülleri nerede bulacağını bildirir. Göreli olmayan adlara sahip tüm modül içe aktarmalarının baseUrl ile göreceli olduğu varsayılır.

### paths
Bazen modüller doğrudan baseUrl altına yerleştirilmez. Örneğin, "jquery" modülüne aktarım çalışma zamanında "node_modules/jquery/dist/jquery.slim.min.js" ye çevrilir. Yükleyiciler, modül adlarını çalışma zamanında dosyalara eşlemek için Modül kavramında anlatıldığı gibi bir eşleme yapılandırması kullanır. TypeScript derleyicisi tsconfig.json dosyalarındaki "paths" özelliğini kullanarak bu tür eşlemelerin bildirilmesini destekler. Aşağıda, jquery için "paths" özelliğinin nasıl belirtileceğine ilişkin bir örnek verilmiştir.

```
{
  "compilerOptions": {
    "baseUrl": ".", // "paths" tanımlandığı için "baseUrl" tanımlı olmak zorundadır
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // Bu eşleme "baseUrl" de belirtilen dizin yoluna görece yapılır
    }
  }
}
```

Lütfen "paths" bilgisinin "baseUrl" ile ilişkili olarak çözüldüğüne dikkat edin.

tsconfig.json  Dosyasında "baseUrl" ifadesini "." dışında bir değere atarken, eşlemeler buna göre değiştirilmelidir.

Diyelim, yukarıdaki örnekte "baseUrl": "./src" ayarını yaptınız, sonra jquery "../node_modules/jquery/dist/jquery" olarak eşlenmelidir. 

Tekrar ederek angular projemizdeki tsconfig.json yapısını inceleyelim. Typescript modülleri bulmak için baseUrl ile göreceli olarak dosyaları arar. Bazen modüller doğrudan baseUrl ile belirtilen bir yerde olmayabilir ve bu modüllerin yerlerini paths ile vermemiz gerekebilir. 

Projeler dizininde çeşitli kütüphane tanımları oluşturulmuş durumda. Ayrıca src dizini altında tüm kütüphanelerin testini yapabileceğimiz bir application tipinde proje de mevcut. Application projesinde bu kütüphanelere referans verilmiş ve projenin ayağa kalktığında bu modüllere erişebilmesi için derleyicinin bulabilmesi gerekmekte. Bu yüzden paths altında @cinar/cn-nef adında bir modüle bağlantı yapıldığında "dist/cinar/cn-nef" dizininde ilgili modülü bulabileceğini bu şekilde belirtebiliyoruz. 

Aynı mantıkta @ngx-translate/* adında tüm modüllerin "./node_modules/@ngx-translate" dizini içerisinde erişilebileceğini de derleyiciye bildiriyoruz. Kendi modüllerimiz bu sayede derlendiği sırada eğer @ngx-translate  modüllerine erişmek isterse Typescript dizin yolunu bulduğu için özel modüllerimizin derlenmesinde bir sorun olmayacak. 

### moduleNameMapper

Yukarıda anlatılan tsconfig içinde geçerli olan paths ve baseUrl kavramlarını öğrendiğimize göre şimdi moduleNameMapper ne işe yarıyor ona bakalım. 

Projeniz modüllerden oluşuyor ve bunları test etmek istiyorsunuz. Derleyicinin bu modüllerin yerlerini bilmesi için tsconfig.json dosyamızdaki baseUrl veya paths bilgilerini kullandığını ve aşağıdaki gibi tsconfig.json içinde konumlandığını görelim. Derinlemesine basUrl ve paths için dalmadan önce modül kavramını hatırlayalım.

Angular projeniz sadece uygulama içeriyor olsa bile bir çok @angular kapsamı altında paketler içeriyor olacak. Ya da harici paketlerden @ngx-translate de test kodlarımız çalıştığında erişmek isteyeceklerimizdendir. O halde projemizin paths içinde belirttiği paketleri (modülleri) jest içinde kullanılabilir kılmak için aşağıdaki ayarı da eklememiz gerekecek:

```
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
```

`<rootDir>` Değeri mümkün olduğunca projenin kök dizini olursa kütüphanelerinizde (projects dizini altındaki kütüphane modülllerinizdeki jest.config.js dosyasında) bu ayarı güncellemeniz gerekmeyecek.

Bu kod çalıştığında tsconfig.json dosyanızdaki modüller jest içinde şöyle tanımlanmış olacaklar:


tsconfig.json içinde paths özelliğinde:

```
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap"...
    ....
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"],
    "paths": {
      "@cinar/cn-nrf": ["dist/cinar/cn-nrf"],
      "@cinar/cn-nrf/*": ["dist/cinar/cn-nrf/*"],
      "@ngx-translate/*": ["./node_modules/@ngx-translate/*"],
      "@angular/*": ["./node_modules/@angular/*"]
      ...
    ...
```

jest ayarlarında:

```
"moduleNameMapper": [
  [
    "\\.(jpg|jpeg|png)$",
    "C:\\Users\\cem.topkaya\\git\\ng-proje-dizini\\node_modules\\@angular-builders\\jest\\dist\\jest-config/mock-module.js"
  ],
  [
    "^@cinar/cn\\-nrf$",
    "C:\\Users\\cem.topkaya\\git\\ng-proje-dizini\\dist\\cinar\\cn-nrf"
  ],
  [
    "^@cinar/cn\\-nrf/(.*)$",
    "C:\\Users\\cem.topkaya\\git\\ng-proje-dizini\\dist\\cinar\\cn-nrf\\$1"
  ],
  [
    "^@ngx\\-translate/(.*)$",
    "C:\\Users\\cem.topkaya\\git\\ng-proje-dizini\\node_modules\\@ngx-translate\\$1"
  ],
  [
    "^@angular/(.*)$",
    "C:\\Users\\cem.topkaya\\git\\ng-proje-dizini\\node_modules\\@angular\\$1"
  ],
```

#### modül Kavramı (genel kültür olsun deyyu)

##### Modül
ECMAScript 2015'ten başlayarak JavaScript içinde bir modül konsepti vardır ve bu kavramı TypeScript de kullanır. 

Modüller, küresel kapsamda değil, kendi kapsamlarında yürütülür; bu, bir modülde bildirilen değişkenlerin, işlevlerin, sınıfların vb. dışa aktarma formlarından biri kullanılarak açıkça dışa aktarılmadığı sürece, modülün dışında görünmeyeceği anlamına gelir. Tersine, farklı bir modülden dışa aktarılan bir değişken, fonksiyon, sınıf, arayüz vb. yapıları kullanmak için içe aktarma formlarından biri kullanılması gerekir. Kısaca modül içindeki bir yapıyı export etmezsen başka bir modülde import edemezsin!

Bir modülü içeriye aktarabilmek için modül yükleyicisi kullanmak zorundayız. Modül yükleyicisinin esas görevi içeri aktarılacak modülün dosya bağlantılarını çözümlemektir. Nodejs içinde kullanılan modül yükleyicisi CommonJS iken web uygulamalarından AMD tipindeki modülleri yükleyen modül yükleyicisi ise RequireJs'dir.

##### Modül yükleme sistemleri:

  - Node.js (CommonJS),
  - require.js (AMD), 
  - UMD, 
  - SystemJS, 
  - ECMAScript 2015 native modules (ES6) 
  
Typescript bir modülü çözümlemek için klasik veya Nodejs yöntemlerinden birini kullanacaktır.

##### Göreceli Modül Arayışında Klasik & Nodejs & Typescript Yöntemleri 

`/root/src/folder/A.ts` dosyasındayız ve `import { b } from "./moduleB"` ile moduleB modülünden b yi içe aktarmak isteyelim. Klasik yöntemde göreceli modül arayışına (/, ./, ../ ile dizin yolunu göreceli olarak gireriz) girecek.

Klasik yöntemle Modülün bulunması şu şekilde olacaktır:
```
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
```

Nodejs için göreceli modül arayışı aşağıdaki akışta olacaktır:

`/root/src/moduleB.js` eğer bulabilirse uzantısı .js olacak şekilde arar. 
Dosya olarak bulamazsa modül adını dizin adı gibi arar: `/root/src/moduleB` eğer dizin adıyla bulursa içinde ÖNCE package.json dosyası var mı? `package.json` varsa içinde "main" özelliği var mı ( `{ "main": "lib/mainModule.js" }` ) ? 

Baktı ki dizin var ama `package.json` yok veya istediğimiz main tanımı yoksa bu kez dizin içinde `index.js` ( `/root/src/moduleB/index.js` ) dosyası var mı diye bakar? 

Typescript için ise göreceli modül arayışı şu şekilde gerçekleşecektir:

```
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (Eğer "types" adında bir özelliği varsa package.json işe yarayacaktır)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
```

##### Göreceli Olmayan Modül Arayışında Klasik & Nodejs & Typescript Yöntemleri 

`/root/src/folder/A.ts` dosyasındayız ve `import { b } from "moduleB"` ile moduleB modülünden b yi içe aktarmak isteyelim. Göreceli bakışı tanımlayan `/  ./  ../`  önekleri olmaksızın doğrudan moduleB diye arıyor olalım.

Klasik yöntemle:

```
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
```

Nodejs ile ararken node_modules dizinini önce A.ts dosyasının olduğu dizinden başlayarak üst dizinlere bakar ve arar:

```
/root/src/node_modules/moduleB.js
/root/src/node_modules/moduleB/package.json (Eğer "main" adında özelliği varsa)
/root/src/node_modules/moduleB/index.js

/root/node_modules/moduleB.js
/root/node_modules/moduleB/package.json (Eğer "main" adında özelliği varsa)
/root/node_modules/moduleB/index.js

/node_modules/moduleB.js
/node_modules/moduleB/package.json (Eğer "main" adında özelliği varsa)
/node_modules/moduleB/index.js
```

Typescript ise nodejs gibi ancak bu kez sadece js dosyalarını değil .ts, .tsx, .d.ts dosyalarıyla birlikte package.json içinde types özelliğine bakarak arar:

```
/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (Eğer "types" adında özelliği varsa)
/root/src/node_modules/@types/moduleB.d.ts
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (Eğer "types" adında özelliği varsa)
/root/node_modules/@types/moduleB.d.ts
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts

/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (Eğer "types" adında özelliği varsa)
/node_modules/@types/moduleB.d.ts
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts
```


## Sorun Giderme

### `TypeError: Cannot read property 'getComponentFromError' of null` 

`TypeError: Cannot read property 'getComponentFromError' of null` hatasını alıyorsanız ve 
her testten önce çalışmasını istediğimiz bir script varsa `setupFilesAfterEnv` tam bu iş için biçilmiş kaftan.

```
  ● Servis içeren Servis › should be created

    TypeError: Cannot read property 'getComponentFromError' of null

      at TestBedViewEngine._initIfNeeded (../../packages/core/testing/src/test_bed.ts:378:46)
      at TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:464:10)
      at Function.TestBedViewEngine.get (../../packages/core/testing/src/test_bed.ts:228:36)
      at Object.<anonymous> (projects/kapsam/paket-a/src/lib/servis_test/servis-iceren.service.spec.ts:18:23)
```

Yukarıdaki hatayı, angular projesinde jest için ön ayarların çalışmasını sağlayan  `import 'jest-preset-angular';` satırını içeren `setupJest.ts` (ismi farklı olabilir elbette) dosyasını her test öncesinde çalıştırarak giderilebilinir. Böylece kepeğe son!  

Eğer ayarlar içinde `setupFilesAfterEnv:['<rootDir>/setupJest.ts'],` satırını ekleyip aşağıdaki komut satırını konsolda çalıştırırsak şu ayarları görebiliriz: 

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

Ve  ayarları görüntülemek istediğimizde `setupFilesAfterEnv` ayarını bir dizi olarak görüntüler. 
```
 $ ng test @kapsam/paket-a --showConfig | grep setupFilesAfterEnv -A3
  "setupFilesAfterEnv": [
    "C:\\Users\\cem.topkaya\\git\\jest-ng-test\\projects\\kapsam\\paket-a\\src\\setupJest.ts"
  ],
```

Yani "adamlar `setupFilesAfterEnv` özelliğini dizi alır demişler, sen neden hala string değeri atıyorsun kardeşceğizim" diye mealen okunabilir.

### `Can't resolve all parameters for ServisIcerenService: (?).` Hatası 

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

`Can't resolve all parameters for ServisIcerenService: (?).` hatasını alıyorsunuz aşağıdaki işlemleri yaptığınızdan emin olun:

  1) Typescript kodunun derlenmesinde `@NgModule, @Component, @Injectable` gibi dekoratörleri anlayabilmesi için `tsconfig.xxx.json` dosyalarından hangisini referans olarak veriyorsanız bu dosyada `compilerOptions` özelliğine aşağıdaki özelliği eklemelisiniz:

    ```
      "compilerOptions": {
        "emitDecoratorMetadata": true,
        "outDir": ....,
        "types": [
          "jest",
          "node"
        ]
      },
    ```

   2) setupFilesAfterEnv ayarını yapınız (`TypeError: Cannot read property 'getComponentFromError' of null` hatasında detaylanmıştı).

  3) Bu sorunu gidermek için `jest.config.js` dosyanıza `preset: 'jest-preset-angular',` satırını aşağıdaki gibi ekleyin:

      ```
      module.exports = {
        preset: 'jest-preset-angular',
        globals: {
          "ts-jest": {
      ```





## Testin Yapısı

## Derleme

`ng build` ile varsayılan projeyi derleriz. Derleme sonucunda oluşacak dosyalar `dist/` dizinine kopyalanır. Projelerin/kütüphanelerin dist dizinine derlenmiş hallerini bağımlı modülleri dist dizinine doğru sırayla atacak şekilde oluşturmalısınız. Doğru sıradan kastım en bağımsız modülü en önce sonra sırasıyla diğer modülleri bağımlılıklarına göre build etmekti. `--prod` Anahtarını kullanarak üretim hattına doğru yazılımınızı derlemiş olacaksınız.

## Birim Testleri Çalıştırmak

`ng test` Komutu angular.json içindeki tüm testleri Jest üstünden çalıştıracaktır.
`ng test @kapsam/paket-a` Komut satırında çalıştırıldığında sadece `@kapsam/paket-a` kütüphanesinin testlerini koşturmuş oluruz.
`angular.json` Dosyasında tanımlanmış proje isimlerini kullanarak testleri koşturabiliriz.
Eğer sadece özel bir testi koşturmak istersek `npx jest "<spec.ts dosyasının yolu>" -t "<it ile tanımlı testin açıklaması>"`

```
$ npx jest "c:/Users/cem.topkaya/git/jest-ng-test/projects/kapsam/paket-a/src/lib/servis_test/basit.service.spec.ts" -t "PaketAService should be created"

veya npx ile

$ node "c:/Users/cem.topkaya/git/jest-ng-test/node_modules/jest/bin/jest.js" "c:/Users/cem.topkaya/git/jest-ng-test/projects/kapsam/paket-a/src/lib/servis_test/basit.service.spec.ts" -t "PaketAService should be created"
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
