import './App.css';
import Title from '../components/title.tsx';
import ManipulateProducts from '../components/manipulate-products.tsx';
import { DisplayProducts } from '../components/display-products.tsx';
import ProductModal from '../components/product-modal.tsx';
import { useState } from 'react';
import ConfirmDeleteModal from '../components/confirm-delete-modal.tsx';

function App() {
  const [products, setProducts] = useState<ProductData[]>([
    { name: 'Running Shoes', price: 129.99, category: 'Sports', stock: 15 },
    { name: 'Tennis Racket', price: 79.99, category: 'Sports', stock: 5 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onOpenAdd = () => {
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingIndex(null);
  };

  const handleDeleteModalCancel = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {};

  return (
    <div className="flex flex-col w-screen justify-center px-50 py-10 gap-20">
      <Title />
      <ManipulateProducts onAdd={onOpenAdd} />
      <DisplayProducts
        products={products}
        onEdit={handleEdit}
        onDelete={handleConfirmDelete}
      />
      {showModal && (
        <ProductModal
          productData={
            editingIndex !== null ? products[editingIndex] : undefined
          }
          onCancel={handleCancel}
          onSave={handleSave}
          title={editingIndex !== null ? 'Edit Product' : 'Add Product'}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={handleDeleteModalCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
