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

### `@typescript-eslint/utils`

Are we using it?


[Angular Nx version matrix]: https://nx.dev/docs/technologies/angular/guides/angular-nx-version-matrix
[Node Nx version matrix]: https://nx.dev/docs/technologies/node/introduction#requirements
