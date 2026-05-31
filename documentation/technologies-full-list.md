# Technologies

## Full list

### Angular

#### `@angular/core`

- `ChangeDetectionStrategy.OnPush`
- `ChangeDetectorRef`
- `Component`
- `DOCUMENT`
- `DestroyRef`
- `Injectable`
- `InjectionToken`
- `Input`
- `PLATFORM_ID`
- `Renderer2`
- `ViewChild`
- `inject`
- `provideBrowserGlobalErrorListeners`
- `provideZonelessChangeDetection` // It is not necessary in @Angular@21+.
- `type ApplicationConfig`
- `type OnInit`
- Signals
  - `computed`
  - `effect`
  - `input`
  - `signal`
  - `viewChild`

- `@angular/core/rxjs-interop`
  - `takeUntilDestroyed`
  - `toSignal`

- `@angular/core/testing`
  - `TestBed`
  - `getTestBed`
  - `type ComponentFixture`

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

- `@angular/platform-browser-dynamic/testing`, deprecated
  - `BrowserDynamicTestingModule`
  - `platformBrowserDynamicTesting`

#### `@angular/router`

- `RouterModule`
- `provideRouter`
- `type Route`

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

- `@else`, `@if`
- `@for $_i from $_a through $_b`
- `@function`, `@return`
- `@include`
- `@mixin`
- `@use`

### TypeScript

- `as const`
- `asserts value is Type`
- `readonly`
- `satisfies`
- `typeof`

- `ReturnType`

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
