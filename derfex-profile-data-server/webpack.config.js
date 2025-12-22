const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')

module.exports = {
  output: {
    clean: true,
    path: join(__dirname, '../dist/derfex-profile-data-server'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      assets: ['./src/assets'],
      compiler: 'tsc',
      generatePackageJson: true,
      main: './src/main.ts',
      optimization: false,
      outputHashing: 'none',
      sourceMaps: true,
      target: 'node',
      tsConfig: './tsconfig.app.json',
    }),
  ],
}
