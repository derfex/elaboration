import type { PSProduct } from '../../../../architecture/entities/ps-products/ps-products.type'

export interface PSProductTableItem {
  readonly id: PSProduct['id']
  readonly name: PSProduct['name']
  readonly parent: PSProduct['parent']
  readonly price: PSProduct['price']
}
