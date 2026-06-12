# Technologies

## Used

### Angular

#### `@angular/core`

- `ChangeDetectionStrategy.OnPush`
- `ChangeDetectorRef`
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
  - `effect`
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

#### `@angular/cdk`

- `@angular/cdk/collections`
  - `SelectionModel`

#### `@angular/common`

- `NgComponentOutlet`
- `NgOptimizedImage`
- `NgTemplateOutlet`

- `@angular/common/http`
  - `HttpClient`
  - `provideHttpClient`
  - `withFetch`

- `@angular/common/http/testing`
  - `HttpTestingController`
  - `provideHttpClientTesting`

#### `@angular/forms`

- `FormsModule`

#### `@angular/platform-browser`

- `DomSanitizer`
- `bootstrapApplication`
- `type SafeResourceUrl`

- `@angular/platform-browser/testing`
  - `BrowserTestingModule`
  - `platformBrowserTesting`

#### `@angular/router`

- `RouterModule`
- `provideRouter`
- `type Route`

#### Templates

- conditions: `@if`, `@else`
- cycles: `@for (… of …; track …)`, `@empty`
- `@defer`

### CSS

- CSS flexible box layout
- CSS grid layout
  - `grid-template-columns: subgrid`
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

### Nest

- `@Body`
- `@Controller`
- `@Get`
- `@Injectable`
- `@Module`
- `@Post`

- `HttpException`
- `HttpStatus`

### Node

- `'node:fs/promises'`
  - `access`
  - `constants`
- `'node:path'`

- `__dirname`

### RxJS

- `BehaviorSubject`
- `catchError`
- `combineLatest`
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
- `ReturnType<…>`

### Vite

- `import.meta.env.VITE_*`

### Vue

- Composition API
- Composables

- `<script lang="ts" setup>`
- `<style lang="sass" scoped>`

- `defineEmits`
- `defineProps`

- Reactivity API: Core
  - `computed`
  - `ref`
  - `watch`
  - `watchEffect`
- Reactivity API: Advanced
  - `shallowRef`

### Unknown

- Vite?
  - `import.meta.env.BASE_URL`

### Web API

- CSSOM view API
  - `MediaQueryList`
  - `MediaQueryListEvent`
- Console API
- Web Storage API
