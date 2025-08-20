import Button from './button';
import type { ChangeEvent } from 'react';
import type { SortOption } from '../src/types/product.types.ts';

type ManipulateProductsProps = {
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  sortOption: SortOption;
  onSortChange: (v: SortOption) => void;
  onClearFilters: () => void;
};

export default function ManipulateProducts(props: ManipulateProductsProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      <Button
        label="+ Add Product"
        className="bg-slate-900 px-4 py-2 text-white font-bold p-10 hover:bg-slate-700 text-sm"
        onClick={props.onAdd}
      />
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 w-full">
        <div className="flex flex-row gap-4 w-full items-center">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search products.."
              className="h-12 bg-gray-100 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
              value={props.searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center gap-10 justify-between">
            <select
              className="h-12 px-4  rounded-lg border border-gray-300 text-sm bg-white"
              value={props.selectedCategory}
              onChange={(e) => props.onCategoryChange(e.target.value)}
            >
              {props.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="h-12 px-4 rounded-lg border border-gray-300 text-sm bg-white"
              value={props.sortOption}
              onChange={(e) => props.onSortChange(e.target.value as SortOption)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low-High)</option>
              <option value="price-desc">Price (High-Low)</option>
              <option value="stock-asc">Stock (Low-High)</option>
              <option value="stock-desc">Stock (High-Low)</option>
            </select>

            <Button
              label="Clear Filters"
              className="h-12 px-4  rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium whitespace-nowrap"
              onClick={props.onClearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
