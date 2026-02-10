import type { PSProductCategory } from '../../../architecture/entities/ps-product-categories/ps-product-categories.type'

export const psProductCategoriesRaw = [
  {
    name: 'Accessories',
  },
  {
    name: 'Aquariums',
  },
  {
    name: 'Decorations',
  },
  {
    name: 'Food',
  },
] as const satisfies readonly Omit<PSProductCategory, 'id'>[]
