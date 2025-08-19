import Button from './button';

type ManipulateProductsProps = {
  onAdd: () => void;
};

export default function ManipulateProducts(props: ManipulateProductsProps) {
  return (
    <div className="flex flex-col items-start gap-6 w-full">
      <Button
        label="+ Add Product"
        className="bg-slate-900 px-4 py-2 text-white font-bold p-10 hover:bg-slate-700 text-sm"
        onClick={props.onAdd}
      />
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products.."
              className="bg-gray-100 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white">
              <option>All Categories</option>
              <option>Electronics</option>
            </select>

            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white">
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
            </select>

            <Button
              label="Clear Filters"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
