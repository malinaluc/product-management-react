import Button from '../components/button';
import { type ChangeEvent, useEffect, useState } from 'react';
import type {
  CreateProductDto,
  ProductData,
} from '../src/types/product.types.ts';

type ProductModalProps = {
  title: string;
  productData?: ProductData;
  onSave?: (payload: CreateProductDto | ProductData) => void;
  onCancel?: () => void;
};

type ModalState = {
  name: string;
  price: string;
  category: string;
  stock: string;
};

export default function ProductModal(props: ProductModalProps) {
  const defaultProduct: ModalState = {
    name: '',
    price: '',
    category: '',
    stock: '',
  };
  const [modal, setModal] = useState<ModalState>(() =>
    props.productData
      ? {
          name: props.productData.name,
          price: String(props.productData.price),
          category: props.productData.category,
          stock: String(props.productData.stock),
        }
      : defaultProduct
  );

  useEffect(() => {
    if (props.productData) {
      setModal({
        name: props.productData.name,
        price: String(props.productData.price),
        category: props.productData.category,
        stock: String(props.productData.stock),
      });
    } else {
      setModal(defaultProduct);
    }
  }, [props.productData]);

  const saveLabel = props.productData ? 'Update Product' : 'Add Product';

  const handleSave = () => {
    const name = modal.name.trim();
    const price = parseFloat(modal.price);
    const stock = parseInt(modal.stock, 10);
    const category = modal.category.trim();

    if (!name) {
      alert('Please enter product name');
      return;
    }
    if (price < 0 || isNaN(price)) {
      alert('Please enter a valid price');
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      alert('Please enter a valid stock');
      return;
    }
    if (!category) {
      alert('Please enter a category');
      return;
    }

    if (props.productData) {
      props.onSave?.({
        id: props.productData.id,
        name,
        price,
        category,
        stock,
      });
    } else {
      props.onSave?.({
        name,
        price,
        category,
        stock,
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModal((prev) => ({ ...prev, [name]: value }));
  };

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
                name="name"
                type="text"
                value={modal.name}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Price ($)</label>
              <input
                name="price"
                type="text"
                value={modal.price}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Category</label>
              <input
                name="category"
                type="text"
                value={modal.category}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Stock</label>
              <input
                name="stock"
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
