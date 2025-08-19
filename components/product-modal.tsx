import Button from '../components/button';
import { useEffect, useState } from 'react';

type ProductData = {
  name: string;
  price: number;
  category: string;
  stock: number;
};

type ProductModalProps = {
  title: string;
  onEdit?: boolean;
  onCancel?: () => void;
  productData?: ProductData;
  onSave?: () => void;
};

export default function ProductModal(props: ProductModalProps) {
  const defaultProduct: ProductData = {
    name: '',
    price: 0,
    category: '',
    stock: 0,
  };
  const [modal, setModal] = useState<ProductData>(
    props.productData ?? defaultProduct
  );
  const saveLabel = props.onEdit ? 'Update Product' : 'Add Product';

  useEffect(() => {
    if (props.productData) {
      setModal({
        name: props.productData.name ?? '',
        price: props.productData.price ?? 0,
        category: props.productData.category ?? '',
        stock: props.productData.stock ?? 0,
      });
    }
  }, [props.productData]);

  const handleSave = () => {};

  const onChange = () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={props.onCancel}
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden ">
        <div className="flex items-start justify-between px-6 pt-6 pb-6">
          <h2 className="text-lg font-semibold text-gray-900">{props.title}</h2>

          <button
            type="button"
            onClick={props.onCancel}
            className="text-gray-400 hover:text-gray-700 transition-transform active:scale-95"
            aria-label="close"
          >
            x
          </button>
        </div>

        <hr className="border-t border-gray-200" />

        <div className="px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Product Name</label>
              <input
                type="text"
                value={modal.name}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Price ($)</label>
              <input
                type="text"
                value={modal.price}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Category</label>
              <input
                type="text"
                value={modal.category}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Stock</label>
              <input
                type="number"
                value={modal.stock}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex justify-end gap-3">
            <Button
              label="Cancel"
              onClick={props.onCancel}
              className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg"
            />
            <Button
              label={saveLabel}
              onClick={handleSave}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
