/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { defineConfig, type UserConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/pet-shop',
    plugins: [angular(), nxCopyAssetsPlugin(['*.md'])],
    // Uncomment this if you are using workers.
    // worker: {
    //   plugins: () => [nxViteTsPaths()],
    // },
    // ↓
    // Uncomment this if you are using workers.
    // import tsconfigPaths from 'vite-tsconfig-paths'
    // …
    // worker: {
    //   plugins: [
    //     tsconfigPaths(),
    //   ],
    // },
    resolve: {
      tsconfigPaths: true,
    },
    // FIXME: «TS2353: Object literal may only specify known properties, and `test` does not exist in type `UserConfig`».
    test: {
      coverage: {
        provider: 'v8' as const,
        reportsDirectory: '../../coverage/apps/pet-shop',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      setupFiles: ['src/test-setup.ts'],
      watch: false,
    },
  }),
)
