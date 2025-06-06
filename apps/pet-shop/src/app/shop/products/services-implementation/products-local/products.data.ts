import { ProductTableViewModel } from '../../shared/product-table-view.model'
import { ProductsModel } from './products.model'

const products = new ProductsModel()

;(
  [
    ['CPU', 'PC', 37000],
    ['Video card', 'PC', 69000],
    ['Motherboard', 'PC', 9000],
    ['RAM', 'PC', 6000],
    ['Source of power', 'PC', 1500],
    ['Cooler', 'PC', 3000],
  ] satisfies readonly [string, string, number][]
).forEach(([name, parentName, price]: [string, string, number]): void => {
  products.addProduct({
    name,
    parent: {
      id: 1,
      name: parentName,
    },
    price,
  })
})

export default products.getAll() as readonly ProductTableViewModel[]
