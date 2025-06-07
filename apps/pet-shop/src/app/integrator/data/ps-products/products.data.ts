import type { PSProductTableItem } from '../../ui/ps-products/ps-products.type'
import { ProductsModel } from './ps-products-storage'

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
  products.create({
    name,
    parent: {
      id: 1,
      name: parentName,
    },
    price,
  })
})

export default products.readList() as readonly PSProductTableItem[]
