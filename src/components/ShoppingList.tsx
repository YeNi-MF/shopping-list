//src/components/ShoppingList.tsx
'use client'

import React, { useState } from 'react';
import { ShopItem } from './ShoppingItem';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const ShopList = () => {
  const { state, toggleItemComplete, removeItem } = useShoppingList();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = () => {
    setIsLoading(true);
    router.push('/item-manager');
  };

  const handleEditItem = (id: string) => {
    setIsLoading(true);
    router.push(`/item-manager/${id}`);
  };

  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col py-4 md:py-10 bg-[#0a0214] w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4">
        <div className="flex items-center">
          <img src="/images/Create.png" alt="Shopping List Logo" width={50} height={50} className="md:w-[75px] md:h-[75px]" />
          <h1 className="text-xl md:text-2xl font-bold ml-2">Shopping List</h1>
        </div>
        <button
          onClick={handleCreateProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Create Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.items.map(item => (
          <ShopItem
            key={item.id}
            item={item}
            onToggleComplete={toggleItemComplete}
            onEditView={handleEditItem}
            onRemove={removeItem}
          />
        ))}
      </div>

      {state.items.length > 0 && (
        <div className="mt-6 md:mt-10 p-3 rounded-lg text-right">
          <p className="text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      )}

      {state.items.length === 0 && !state.isLoading && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-gray-500 mb-4">
            Your shopping list is empty. Create a product!
          </p>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Your First Item
          </button>
        </div>
      )}

      {state.isLoading && (
        <div className="flex justify-center items-center py-10">
          <p>Loading items...</p>
        </div>
      )}
    </div>
  );
};