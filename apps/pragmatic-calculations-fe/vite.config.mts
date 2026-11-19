/// <reference types='vitest/config' />
import vuePlugin from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config
export default defineConfig(
  (): UserConfig => ({
    cacheDir: '../../node_modules/.vite/apps/pragmatic-calculations-fe',
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
      outDir: '../../dist/apps/pragmatic-calculations-fe',
      reportCompressedSize: true,
    },
    plugins: [
      vuePlugin(),
      VitePWA({
        manifest: {
          background_color: '#000',
          description: 'Assistance in predicting benefits.',
          display: 'standalone',
          icons: [
            {
              sizes: 'any',
              src: 'assets/derfex-logotype.svg',
            },
          ],
          name: 'Pragmatic calculations | by derfex',
          short_name: 'Pragmatic calculations',
          theme_color: '#0ff',
        },
        registerType: 'autoUpdate',
      }),
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
    root: import.meta.dirname,
    test: {
      coverage: {
        provider: 'v8' as const,
        reportsDirectory: '../../coverage/apps/pragmatic-calculations-fe',
      },
      environment: 'jsdom',
      globals: true,
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      name: 'pragmatic-calculations-fe',
      reporters: ['default'],
      watch: false,
    },
  }),
)
