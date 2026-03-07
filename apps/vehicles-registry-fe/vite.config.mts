/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/vehicles-registry-fe',
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
  //   plugins: () => [nxViteTsPaths()],
  // },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    outDir: '../../dist/apps/vehicles-registry-fe',
    reportCompressedSize: true,
  },
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
}))
