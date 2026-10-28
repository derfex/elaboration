# Elaboration applications

## Nx migrations

```sh
nx migrate latest --interactive
```

```sh
nx migrate <package>@<version>
```

```sh
npm install --ignore-scripts
nx migrate --run-migrations
```
### Check list

- [ ] Angular compatibility: [Angular Nx version matrix][Angular Nx version matrix].
- [ ] Node.js compatibility: [Node Nx version matrix][Node Nx version matrix].
- [ ] Unit-tests:
  ```sh
  nx run-many --all --target=test
  ```

## Troubleshooting

When installing new dependencies, `npm error code ERESOLVE` may occur.
We can try to resolve conflicts between installed and expected dependencies by deleting `node_modules` folder
and `package-lock.json` file, then running the dependency installation process again.

## To do

### `Angular@21`

Do we need to start use `await fixture.whenStable()`?

API documentation:
https://angular.dev/api/core/testing/ComponentFixture#whenStable

— Do we need to start use `await fixture.whenStable()`?
— Looks like it is not necessary.
https://angular.dev/guide/zoneless#using-zoneless-in-testbed

### Vue. `vue-router`

For `nx@22.7.12` to `nx@23.0.2` migration we have a conflict of our dependencies.

The problem is for `@nx/vue@23.0.2`.  
Source: https://www.npmjs.com/package/@nx/vue/v/23.0.2?activeTab=code
```json
{  
  "peerDependencies": {
    "vue": "^3.0.0",
    "vue-router": "^4.0.0",
    "…": "…"
  }
}
```
It seems that `vue-router`'s versions 4 and 5 are almost entirely backward compatible.

Solution: the version of `vue-router@5.0.3` was (temporary?) downgraded to `vue-router@^4.5.0`.  
TODO: migrate to `vue-router@5.0.3`.

### `@typescript-eslint/utils`

Are we using it?


[Angular Nx version matrix]: https://nx.dev/docs/technologies/angular/guides/angular-nx-version-matrix
[Node Nx version matrix]: https://nx.dev/docs/technologies/node/introduction#requirements
