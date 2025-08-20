import Button from '../components/button';
import type { ProductData } from '../src/types/product.types.ts';

type ProductCardProps = ProductData & {
  onEdit?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="flex flex-col items-start bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-sm">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-black font-bold text-lg">{props.name}</h1>
        <input
          type="checkbox"
          checked={!!props.selected}
          onChange={() => props.onToggleSelect?.()}
        />
      </div>
      <div className="flex flex-col items-start w-full mt-4">
        <div className="flex w-full items-center justify-between text-gray-500 pt-3 pb-3">
          <p className="font-semibold">Price:</p>
          <p className="text-gray-900 font-bold">${props.price}</p>
        </div>

        <div className="flex w-full items-center justify-between text-gray-500 pt-3 pb-3">
          <p className="font-semibold">Category:</p>
          <p className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
            {props.category}
          </p>
        </div>

        <div className="flex w-full items-center justify-between text-gray-500 pt-3 pb-3">
          <p className="font-semibold">Stock:</p>
          <p className="text-gray-900 font-bold">{props.stock}</p>
        </div>

        <div className="mt-4 w-full flex gap-3">
          <Button
            label="Edit"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-green-400 hover:bg-green-300 text-white font-medium w-2xs"
            onClick={props.onEdit}
          />
          <Button
            label="Delete"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-red-400 hover:bg-red-300 text-white font-medium w-2xs"
            onClick={props.onDelete}
          />
        </div>
      </div>
    </div>
  );
}
