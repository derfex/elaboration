# Elaboration applications

## Nx migrations

```sh
nx migrate latest --interactive
```

```sh
nx migrate <package>@<version>
```

### Angular

Compatibility: [Angular Nx version matrix][Angular Nx version matrix].

### Node.js

Compatibility: [Node Nx version matrix][Node Nx version matrix].

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


[Angular Nx version matrix]: https://nx.dev/docs/technologies/angular/guides/angular-nx-version-matrix
[Node Nx version matrix]: https://nx.dev/docs/technologies/node/introduction#requirements
