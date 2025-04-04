//src/components/ShoppingCard.tsx
'use client'
import { ShoppingItem } from "@/types/ShoppingListTypes";
import { useShoppingForm } from "@/hooks/useShoppingForm";
import Image from "next/image";
import { useState } from "react";

const Card = ({ product }: { product?: ShoppingItem }) => {
  const { formRef, handleSubmit, handleCancel } = useShoppingForm({ product });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    await handleSubmit(e);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 mt-15 bg-[#0a0214] text-white rounded-2xl shadow-lg border border-gray-500">
      <div className="flex justify-center">
        <Image
          src={product ? "/images/Edit.png" : "/images/Create.png"}
          alt={product ? "Edit Product" : "Create Product"}
          width={80}
          height={80}
          priority
        />
      </div>

      <h1 className="text-xl font-bold text-center uppercase tracking-wide mt-2">
        {product ? "Edit Product" : "Create Product"}
      </h1>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-4 mt-4">
        <input type="hidden" name="id" value={product?.id || ""} />
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={product?.name || ""}
            placeholder="Enter product name"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            defaultValue={product?.description || ""}
            placeholder="Enter description"
            className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price || "0.00"}
              placeholder="Enter price"
              min={0}
              className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Quantity</label>
            <input
              name="quantity"
              type="number"
              defaultValue={product?.quantity || "1"}
              placeholder="Enter quantity"
              min={1}
              className="w-full p-2 mt-1 bg-gray-900 border border-grey-400 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <span>{product ? "Update" : "Create"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Card;