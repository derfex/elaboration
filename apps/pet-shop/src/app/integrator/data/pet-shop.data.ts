import { PSProductCategoriesStorage } from './ps-categories/ps-product-categories-storage'

const psProductCategoriesStorage = new PSProductCategoriesStorage()

{
  const categoriesNames = ['Food', 'Aquariums', 'Accessories', 'Decorations']
  categoriesNames.forEach((name: string): void => {
    psProductCategoriesStorage.create({ name })
  })
}
