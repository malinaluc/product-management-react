import type { ProductData } from '../types/product.types.ts';

export function loadProductsFromStorage(): ProductData[] {
  try {
    return JSON.parse(
      localStorage.getItem('products') ?? '[]'
    ) as ProductData[];
  } catch {
    return [];
  }
}

export function saveProductsToStorage(products: ProductData[]) {
  localStorage.setItem('products', JSON.stringify(products));
}
