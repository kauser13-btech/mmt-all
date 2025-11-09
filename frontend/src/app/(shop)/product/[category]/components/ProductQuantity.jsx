'use client';

import { Plus, Minus } from "lucide-react";

export default function ProductQuantity({ quantity, setQuantity }) {
  const updateQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Quantity:</span>
      <div className="flex items-center h-10 min-w-[104px] max-w-[104px] rounded-lg border border-gray-200 bg-white px-2 gap-2">
        <button
          onClick={() => updateQuantity(-1)}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          title="Decrease"
          className="flex items-center justify-center w-8 h-8 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-medium text-base">
          {quantity}
        </span>

        <button
          onClick={() => updateQuantity(1)}
          aria-label="Increase quantity"
          title="Increase"
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-50"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
