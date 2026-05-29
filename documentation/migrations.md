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

### `zone.js`

Delete / avoid / reduce usage of `zone.js`.

https://angular.dev/guide/zoneless

Do we need `@analogjs/vitest-angular/setup-zone`?

`zone.js` imported from `…/node_modules/@analogjs/vitest-angular/setup-zone.js`.
