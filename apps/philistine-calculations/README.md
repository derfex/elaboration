# Philistine calculations

## User story

### Accruals on a bank deposits

As a bank client, I want to predict the benefits of depositing money.

### Price comparison

As a buyer, I want to know the unit prices of goods so I can make a better purchase.

## Deploy

Specify the `base` parameter in the `vite` file. It will be used as a prefix for the files.
For example:
```typescript
export default defineConfig(() => ({
  base: '/portfolio/philistine-calculations/',
  // …
}))
```

Run
```shell
nx run philistine-calculations:build
```

Find the corresponding compiled files in `dist/apps/philistine-calculations`.
