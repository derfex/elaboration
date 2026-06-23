# `derfex` profile front-end

## Technologies

### Angular

#### `@angular/core`

- `ChangeDetectionStrategy.OnPush`
- `Component`
- `DOCUMENT`
- `DestroyRef`
- `Injectable`
- `InjectionToken`
- `PLATFORM_ID`
- `Renderer2`
- `inject`
- `provideBrowserGlobalErrorListeners`
- `type ApplicationConfig`
- `type OnInit`
- Signals
  - `computed`
  - `input`
  - `linkedSignal`
  - `signal`

- `@angular/core/rxjs-interop`
  - `takeUntilDestroyed`
  - `toSignal`

- `@angular/core/testing`
  - `TestBed`
  - `getTestBed`
  - `type ComponentFixture`

#### `@angular/common`

- `NgComponentOutlet`
- `NgTemplateOutlet`

- `@angular/common/http`
  - `HttpClient`
  - `provideHttpClient`
  - `withFetch`

- `@angular/common/http/testing`
  - `HttpTestingController`
  - `provideHttpClientTesting`

#### `@angular/platform-browser`

- `bootstrapApplication`

- `@angular/platform-browser/testing`
  - `BrowserTestingModule`
  - `platformBrowserTesting`

#### `@angular/router`

- `RouterModule`
- `provideRouter`
- `type Route`

#### Templates

- conditions: `@if`
- cycles: `@for (… of …; track …)`, `@empty`

### CSS

- CSS flexible box layout
- CSS grid layout
- CSS Houdini
  - Custom Properties & Values
- `@media`

### ECMAScript

- ECMAScript 2018
  - Spread operator.
- ECMAScript 2017
  - `async`, `await`.
  - Trailing commas.
- ECMAScript 2015 (6)
  - Arrow functions.
  - `const`, `let`.
  - Destructuring, object property shorthand.
  - ES6 classes.
  - ES6 collections: `Map`, `Set`.
  - ES6 modules.
  - Promises.

### RxJS

- `BehaviorSubject`
- `Subject`
- `catchError`
- `combineLatest`
- `debounceTime`
- `delay`
- `distinctUntilChanged`
- `map`
- `noop`
- `of`
- `shareReplay`
- `switchMap`
- `tap`
- `zip`
- `type Observable`

### SASS

- conditions: `@if`, `@else`
- cycles: `@for $_i from $_a through $_b`
- `@function`, `@return`
- `@include`
- `@mixin`
- `@use`

### TypeScript

- `as const`
- `asserts` (`asserts value is Type`)
- `extends` (`<Type extends …>`)
- `readonly`
- `satisfies`
- `typeof`

- `ReadonlyMap<…, …>`
- `ReadonlySet<…>`

### Web API

- CSSOM view API
  - `MediaQueryList`
  - `MediaQueryListEvent`
- Console API
- Web Storage API

## Dependencies

### Dependencies

- @angular/common
- @angular/compiler
- @angular/core
- @angular/platform-browser
- @angular/router
- rxjs

### Dev dependencies

- @angular-devkit/core
- @angular-devkit/schematics
- @angular/build
- @angular/cli
- @angular/compiler-cli
- @angular/language-service
- @eslint/js
- @nx/angular
- @nx/devkit
- @nx/eslint
- @nx/eslint-plugin
- @nx/js
- @nx/playwright
- @nx/web
- @nx/workspace
- @playwright/test
- @schematics/angular
- @swc-node/register
- @swc/core
- @swc/helpers
- @typescript-eslint/utils
- angular-eslint
- eslint
- eslint-config-prettier
- eslint-plugin-playwright
- jsdom
- nx
- prettier
- sass
- tslib
- typescript
- typescript-eslint
- vitest
