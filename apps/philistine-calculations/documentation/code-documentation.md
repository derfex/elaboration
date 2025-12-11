# ProjectX. Frontend

## Aliases

### Additional goal

To shorten internal paths for imports, `|` characters are used.
The `|` character code is greater than the codes of the English alphabet characters and the `@` character,
so when sorting in ascending order, internal imports will be placed after third-party imports.

#### What other options are there?

There are a few character variants whose code is greater than the codes of the letters of the English alphabet and which can be entered from a keyboard.

| symbol | code  |
|--------|-------|
| `'z'`  | `122` |
| `'{'`  | `123` |
| `'\|'` | `124` |
| `'}'`  | `125` |
| `'~'`  | `126` |

* Aliases with `'~'` looks good. But we can not use them because of [vue-loader's transform rules][vue-loader's transform rules].
* `'{'` and `'}'` looks strange.
* Microsoft Windows does not allow file names to be named using the '|' character.
This means we have less to worry about ambiguity.
So we use `'|'` for now.

Another idea: `'§'`. Not all keyboards allow us to type `'§'` with one key.

| symbol | code  |
|--------|-------|
| `'§'`  | `167` |

### Uniqueness

To make the sequence more unique, `||` is used.

#### Example

```vue
<script lang="ts" setup>
import { computed } from 'vue'
import XMarketplaceChip from '||/integrator/x-marketplaces/XMarketplaceChip.vue'
  
// …
</script>

<template>
  <img alt="Vue logo" src="||/integrator/ui/vue-example/assets/logo.svg" />
</template>

<style lang="sass" scoped>
@use 'sass:math'
@use '||/integrator/ui/ui-kit/ui-kit'

// …
</style>
```

### TypeScript and Vite

Aliases must be configured in two files:
1. `tsconfig.app.json` — for correct syntax highlighting.
2. `vite.config.ts` — for correct code assembly.


[vue-loader's transform rules]: https://vue-loader.vuejs.org/guide/asset-url.html#transform-rules
