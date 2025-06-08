import type { PSProduct } from '../../../../architecture/entities/ps-products/ps-products.type'
import { PSProductCategoriesStorage } from './ps-categories/ps-product-categories-storage'
import { PSProductsStorage } from './ps-products/ps-products-storage'

const psProductCategoriesStorage = new PSProductCategoriesStorage()
{
  const categoriesNames = ['Food', 'Aquariums', 'Accessories', 'Decorations']
  categoriesNames.forEach((name: string): void => {
    psProductCategoriesStorage.create({ name })
  })
}

const psProductsStorage = new PSProductsStorage()
{
  const productsBlanks: readonly [string, string, number][] = [
    ['Accessory 1', 'Accessories', 37000],
    ['Accessory 2', 'Accessories', 69000],
    ['Aquarium 1', 'Aquariums', 9000],
    ['Aquarium 2', 'Aquariums', 6000],
    ['Food 1', 'Food', 1500],
    ['Food 2', 'Food', 3000],
  ]
  productsBlanks.forEach(([name, categoryName, price]: [string, string, number]): void => {
    const category = psProductCategoriesStorage.readByName(categoryName)
    if (!category) {
      // TODO: Throw an error. Or use a general category.
      return
    }
    psProductsStorage.create({
      category,
      name,
      price,
    })
  })
}

export const psProducts: readonly PSProduct[] = psProductsStorage.readList()
