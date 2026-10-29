/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type UserConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/nx-welcome-vue',
    server: {
      host: 'localhost',
      port: 4200,
    },
    preview: {
      host: 'localhost',
      port: 4300,
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      emptyOutDir: true,
      outDir: '../../dist/apps/nx-welcome-vue',
      reportCompressedSize: true,
    },
    plugins: [vue(), nxCopyAssetsPlugin(['*.md'])],
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
        reportsDirectory: '../../coverage/apps/nx-welcome-vue',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      name: 'nx-welcome-vue',
      reporters: ['default'],
      watch: false,
    },
  }),
)
