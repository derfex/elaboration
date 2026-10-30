/// <reference types='vitest/config' />
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/philistine-calculations-fe',
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
      outDir: '../../dist/apps/philistine-calculations-fe',
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
      alias: {
        '||': fileURLToPath(new URL('./src', import.meta.url)),
        '|integrator': fileURLToPath(new URL('./src/integrator', import.meta.url)),
        '|logic': fileURLToPath(new URL('./src/architecture/logic', import.meta.url)),
        '|ui': fileURLToPath(new URL('./src/integrator/ui', import.meta.url)),
        '|ui-kit': fileURLToPath(new URL('./src/integrator/ui-kit', import.meta.url)),
      },
      tsconfigPaths: true,
    },
    test: {
      coverage: {
        provider: 'v8' as const,
        reportsDirectory: '../../coverage/apps/philistine-calculations-fe',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      name: 'philistine-calculations-fe',
      reporters: ['default'],
      watch: false,
    },
  }),
)
