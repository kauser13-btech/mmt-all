"use client";

import ProductQuantity from "./ProductQuantity";
import ProductColorPicker from "./ProductColorPicker";
import ProductSize from "./ProductSize";
import ProductDetailsTab from "./ProductDetailsTab";
import Sticker from "@/components/global/Sticker";


// import Sticker from "@/app/components/global/Sticker";
// import ScrollAnimation from "@/app/components/scrollAnimation/ScrollAnimation";
import { useState } from "react";


export default function ProductContainer({ data, sneaker, design }) {
  const [size, setSize] = useState('M');

  return (
    <div className="lg:h-[600px] flex flex-col gap-6 md:gap-8 overflow-y-scroll hideScroll">
      <ProductQuantity />

      <ProductColorPicker data={data} />

      <ProductSize
        setSize={setSize}
        size={size}
      />

      <Sticker />

      <ProductDetailsTab data={data} />

      {/*  <ScrollAnimation /> */}
    </div>
  );
};
