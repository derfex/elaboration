/// <reference types='vitest/config' />
import vue from '@vitejs/plugin-vue'
import { defineConfig, type UserConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    cacheDir: '../../node_modules/.vite/apps/vehicles-registry-fe',
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
      outDir: '../../dist/apps/vehicles-registry-fe',
      reportCompressedSize: true,
    },
    plugins: [
      vue(),
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
        reportsDirectory: '../../coverage/apps/vehicles-registry-fe',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      name: 'vehicles-registry-fe',
      reporters: ['default'],
      watch: false,
    },
  }),
)
