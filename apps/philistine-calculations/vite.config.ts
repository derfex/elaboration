/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/philistine-calculations',
  server: {
    host: 'localhost',
    port: 4200,
  },
  preview: {
    host: 'localhost',
    port: 4300,
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: [nxViteTsPaths()],
  // },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    outDir: '../../dist/apps/philistine-calculations',
    reportCompressedSize: true,
  },
  resolve: {
    alias: {
      '||': fileURLToPath(new URL('./src', import.meta.url)),
      '|logic': fileURLToPath(new URL('./src/architecture/logic', import.meta.url)),
      '|ui': fileURLToPath(new URL('./src/integrator/ui', import.meta.url)),
      '|ui-kit': fileURLToPath(new URL('./src/integrator/ui-kit', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8' as const,
      reportsDirectory: '../../coverage/apps/philistine-calculations',
    },
    environment: 'jsdom',
    globals: true,
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    name: 'philistine-calculations',
    reporters: ['default'],
    watch: false,
  },
}))
