// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const root = 'https://ssdev.superagent.ru/TestApp/'

export const environment = {
  API: {
    categories: {
      readList: 'assets/product-categories.json',
    },
    products: {
      readList: 'assets/products.json',
    },
    root,
  },
  production: false,
}
