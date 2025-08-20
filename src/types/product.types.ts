export type ProductData = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
};

export type CreateProductDto = {
  name: string;
  price: number;
  category: string;
  stock: number;
};

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'stock-asc'
  | 'stock-desc';
