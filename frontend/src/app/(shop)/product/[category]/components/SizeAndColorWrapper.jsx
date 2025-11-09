"use client";

import ProductQuantity from "./ProductQuantity";
import ProductColorPicker from "./ProductColorPicker";
import ProductSize from "./ProductSize";
import ProductDetailsTab from "./ProductDetailsTab";
import Sticker from "@/components/global/Sticker";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";


// import Sticker from "@/app/components/global/Sticker";
// import ScrollAnimation from "@/app/components/scrollAnimation/ScrollAnimation";
import { useState } from "react";


export default function ProductContainer({ data, sneaker, design }) {
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(data, quantity, size);
  };

  return (
    <div className="lg:h-[600px] flex flex-col gap-6 md:gap-8 overflow-y-scroll hideScroll">
      <ProductQuantity quantity={quantity} setQuantity={setQuantity} />

      <ProductColorPicker data={data} />

      <ProductSize
        setSize={setSize}
        size={size}
      />

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 bg-orange-primary text-white font-medium rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart size={20} />
        Add to Cart - ${(data.price * quantity).toFixed(2)}
      </button>

      <Sticker />

      <ProductDetailsTab data={data} />

      {/*  <ScrollAnimation /> */}
    </div>
  );
};
