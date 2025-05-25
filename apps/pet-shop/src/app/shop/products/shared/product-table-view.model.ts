// TODO: Avoid `I` prefix.
export interface IProductTableViewModel {
  id: number;
  name: string;
  parent: {
    id: number | null;
    name: string;
  };
  price: number;
}

export type ProductModels = IProductTableViewModel[];
