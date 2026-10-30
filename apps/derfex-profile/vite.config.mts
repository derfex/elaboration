/// <reference types='vitest/config' />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig, type UserConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    cacheDir: '../../node_modules/.vite/apps/derfex-profile',
    plugins: [
      angular(),
      viteStaticCopy({
        targets: [
          {
            dest: '.',
            src: 'src/**/*.md',
          },
        ],
      }),
    ],
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
    root: import.meta.dirname,
    test: {
      coverage: {
        provider: 'v8' as const,
        reportsDirectory: '../../coverage/apps/derfex-profile',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      name: 'derfex-profile',
      reporters: ['default'],
      setupFiles: ['src/test-setup.ts'],
      watch: false,
    },
  }),
)
