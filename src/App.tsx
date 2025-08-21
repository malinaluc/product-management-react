import './App.css';
import Title from '../components/title.tsx';
import ManipulateProducts from '../components/manipulate-products.tsx';
import { DisplayProducts } from '../components/display-products.tsx';
import ProductModal from '../components/product-modal.tsx';
import { useMemo, useState } from 'react';
import ConfirmDeleteModal from '../components/confirm-delete-modal.tsx';
import type {
  CreateProductDto,
  ProductData,
  SortOption,
} from './types/product.types.ts';
import { v4 as uuidv4 } from 'uuid';
import {
  loadProductsFromStorage,
  saveProductsToStorage,
} from './utils/local-storage.ts';

function App() {
  const initialLocalStorage = loadProductsFromStorage();
  const [products, setProducts] = useState<ProductData[]>(
    () => initialLocalStorage
  );
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      const c = (p.category ?? '').trim();
      if (c) set.add(c);
    }
    return [
      'All Categories',
      ...Array.from(set).sort((a, b) => a.localeCompare(b)),
    ];
  }, [products]);

  const onOpenAdd = () => {
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleDeleteModalCancel = () => {
    setShowDeleteModal(false);
    setBulkDeleteMode(false);
  };

  const handleConfirmDelete = (id: string) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== deletingId);
      saveProductsToStorage(next);
      return next;
    });
    setSelectedIds((prev) => prev.filter((id) => id !== deletingId));
    setShowDeleteModal(false);
    setDeletingId(null);
    setBulkDeleteMode(false);
  };

  const handleConfirmBulkDelete = () => {
    setBulkDeleteMode(true);
    setDeletingId(null);
    setShowDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      setShowDeleteModal(false);
      setBulkDeleteMode(false);
      return;
    }
    setProducts((prev) => {
      const next = prev.filter((p) => !selectedIds.includes(p.id));
      saveProductsToStorage(next);
      return next;
    });
    setSelectedIds([]);
    setShowDeleteModal(false);
    setBulkDeleteMode(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const handleSave = (data: CreateProductDto | ProductData) => {
    if ('id' in data && data.id) {
      const updated: ProductData = data;
      setProducts((prev) => {
        const next = prev.map((p) => (p.id === updated.id ? updated : p));
        saveProductsToStorage(next);
        return next;
      });
    } else {
      const newProduct: ProductData = { id: uuidv4(), ...data };
      setProducts((prev) => {
        const next = [newProduct, ...prev];
        saveProductsToStorage(next);
        return next;
      });
    }
    setShowModal(false);
    setEditingId(null);
  };

  const filteredProducts = useMemo(() => {
    const searchedProd = searchQuery.trim().toLowerCase();
    let list = products.slice();

    if (searchedProd) {
      list = list.filter((p) => p.name.toLowerCase().includes(searchedProd));
    }

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'stock-asc':
        list.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        list.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return list;
  }, [products, searchQuery, selectedCategory, sortOption]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('name-asc');
  };

  const productToEdit = editingId
    ? products.find((p) => p.id === editingId)
    : undefined;

  return (
    <div className="flex flex-col w-full justify-center px-50 py-10 gap-20 ">
      <Title />
      <ManipulateProducts
        onAdd={onOpenAdd}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onClearFilters={clearFilters}
      />
      <DisplayProducts
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleConfirmDelete}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onBulkDelete={handleConfirmBulkDelete}
      />
      {showModal && (
        <ProductModal
          productData={productToEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          title={editingId ? 'Edit Product' : 'Add Product'}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={handleDeleteModalCancel}
          onDelete={bulkDeleteMode ? handleBulkDelete : handleDelete}
          selectedCount={bulkDeleteMode ? selectedIds.length : undefined}
        />
      )}
    </div>
  );
}

export default App;
