//src/components/ShoppingItem.tsx
import React from 'react';
import { ShoppingItem } from '@/types/ShoppingListTypes';
import Image from 'next/image';

interface ShopItemProps {
  item: ShoppingItem;
  onToggleComplete: (id: string) => void;
  onEditView: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ShopItem = ({
  item,
  onToggleComplete,
  onEditView,
  onRemove
}: ShopItemProps) => {

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditView(item.id);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  return (
    <div
      className={`flex flex-col h-full bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-lg ${item.completed ? 'opacity-60' : ''
        }`}
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-medium truncate mr-2 ${item.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
            {item.name}
          </h3>
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggleComplete(item.id)}
              className="form-checkbox h-5 w-5 text-blue-500 rounded transition-colors cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-400 line-clamp-2 mb-3 min-h-[40px]">
            {item.description || "No description provided"}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm mt-auto">
            <div className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
              <span className="text-gray-300">Quantity:</span>
              <span className="ml-1 font-medium text-white">{item.quantity}</span>
            </div>
            <div className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
              <span className="text-gray-300">Price:</span>
              <span className="ml-1 font-medium text-white">${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-t border-gray-700 divide-x divide-gray-700">
        <button
          onClick={handleEditClick}
          className="flex-1 p-2 flex items-center justify-center text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 transition-colors"
          aria-label="Edit item"
        >
          <img src="/images/Edit.png" alt="Edit" width={20} height={20} className="mr-1" />
          <span className="text-sm">Edit</span>
        </button>
        <button
          onClick={handleRemoveClick}
          className="flex-1 p-2 flex items-center justify-center text-red-400 hover:bg-red-900 hover:bg-opacity-30 transition-colors"
          aria-label="Remove item"
        >
          <img src="/images/Remove.png" alt="Remove" width={20} height={20} className="mr-1" />
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
  );
};