const root = 'https://ssdev.superagent.ru/TestApp/';

export const environment = {
  API: {
    categories: {
      getAll: root + 'Values/GetParents',
    },
    products: {
      getAll: root + 'Values/GetAll',
    },
    root,
  },
};
