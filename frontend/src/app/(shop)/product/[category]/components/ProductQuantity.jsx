'use client';

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function ProductQuantity({ initial = 1 }) {
  const [quantity, setQuantity] = useState(initial);

  const updateQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="flex flex-wrap w-full gap-4 md:gap-[18px] xl:gap-10 items-center">
      {/* Quantity selector */}
      <div className="flex items-center h-12 min-w-[104px] max-w-[104px] rounded-lg border border-gray-200 bg-white px-2 gap-2">
        <button
          onClick={() => updateQuantity(-1)}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          title="Decrease"
          className="flex items-center justify-center w-9 h-9 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-montserrat font-medium text-base">
          {quantity}
        </span>

        <button
          onClick={() => updateQuantity(1)}
          aria-label="Increase quantity"
          title="Increase"
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-50"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* TODO: Add to cart */}
      <div className="flex-grow">
        <button
          className="btn h-12 w-full rounded-lg bg-orange-primary text-xl md:!text-[2rem] font-staatliches uppercase text-white hover:bg-yellow-primary hover:text-black disabled:text-black"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
