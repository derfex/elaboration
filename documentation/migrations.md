# Elaboration applications

## Nx migrations

```sh
nx migrate latest --interactive
```

```sh
nx migrate <package>@<version>
```

## To do

### `Angular@21`

Do we need to start use `await fixture.whenStable()`?

### `@oxc-project/runtime`

Should we start to use it?

### `@typescript-eslint/utils`

Are we using it?

### `vitest`

Upgrade `vitest` from `3.x.x` to `4.x.x`.

```json
{
  "@vitest/coverage-v8": "4.0.18",
  "@vitest/ui": "4.0.18",
  "vitest": "4.0.18"
}
```
[Migrate `vitest@4`](../tools/ai-migrations/MIGRATE_VITEST_4.md).

#### Step 1

```json
{
  "@vitest/coverage-v8": "^4.0.0",
  "@vitest/ui": "^4.0.0",
  "vitest": "^4.0.8"
}
```

### `zone.js`

Delete / avoid / reduce usage of `zone.js`.

https://angular.dev/guide/zoneless

Do we need `@analogjs/vitest-angular/setup-zone`?

`zone.js` imported from `…/node_modules/@analogjs/vitest-angular/setup-zone.js`.
