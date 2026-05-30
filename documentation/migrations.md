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

API documentation:
https://angular.dev/api/core/testing/ComponentFixture#whenStable

— Do we need to start use `await fixture.whenStable()`?
— Looks like it is not necessary.
https://angular.dev/guide/zoneless#using-zoneless-in-testbed

### `@oxc-project/runtime`

Should we start to use it?

### `@typescript-eslint/utils`

Are we using it?
