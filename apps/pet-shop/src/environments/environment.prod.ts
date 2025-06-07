const root = 'https://ssdev.superagent.ru/TestApp/'

export const environment = {
  API: {
    categories: {
      readList: root + 'Values/GetParents',
    },
    products: {
      getAll: root + 'Values/GetAll',
    },
    root,
  },
  production: true,
}
