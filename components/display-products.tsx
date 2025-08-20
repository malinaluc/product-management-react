import ProductCard from './product-card';
import Button from './button.tsx';
import type { ProductData } from '../src/types/product.types.ts';

type DisplayProductProps = {
  products: ProductData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  onBulkDelete?: () => void;
};

export function DisplayProducts(props: DisplayProductProps) {
  const selectedCount = props.selectedIds?.length ?? 0;

  return (
    <div>
      <div className="flex w-full items-center justify-between ">
        <div className=" flex flex-row items-start">
          <p className="text-black font-bold mb-5 text-xl">Products</p>
          <p className="text-gray-500 font-bold mb-5 ml-1 text-md mt-2">
            ({props.products.length})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            label="Bulk Delete"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium"
            onClick={() => props.onBulkDelete?.()}
            disabled={selectedCount < 2}
          />
        </div>
      </div>
      {props.products.length === 0 ? (
        <div className="flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found.
            </h3>
            <p className="text-sm text-gray-500">
              Add your first product to get started!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-start bg-white border border-gray-200 rounded-xl shadow-sm p-4 gap-7 flex-wrap">
          {props.products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              category={p.category}
              stock={p.stock}
              selected={props.selectedIds?.includes(p.id) ?? false}
              onToggleSelect={() => props.onToggleSelect?.(p.id)}
              onEdit={() => props.onEdit?.(p.id)}
              onDelete={() => props.onDelete?.(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
