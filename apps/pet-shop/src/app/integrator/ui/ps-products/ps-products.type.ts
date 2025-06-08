import type { PSProduct } from '../../../../architecture/entities/ps-products/ps-products.type'

export interface PSProductTableItem {
  readonly category: PSProduct['category']
  readonly id: PSProduct['id']
  readonly name: PSProduct['name']
  readonly price: PSProduct['price']
}
