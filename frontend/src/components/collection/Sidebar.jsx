'use client';

import { useState } from 'react';

import ColorSelection from "./ColorSelection";

export default function Sidebar() {
  const colorData = [
    { color_name: "black", color_code: "#000000" },
    { color_name: "white", color_code: "#ffffff" },
    { color_name: "red", color_code: "#ef4444" },
    { color_name: "blue", color_code: "#3b82f6" },
    { color_name: "green", color_code: "#22c55e" },
    { color_name: "yellow", color_code: "#eab308" },
    { color_name: "purple", color_code: "#a855f7" },
    { color_name: "pink", color_code: "#ec4899" },
    { color_name: "orange", color_code: "#f97316" },
    { color_name: "gray", color_code: "#6b7280" },
    { color_name: "brown", color_code: "#92400e" },
    { color_name: "navy", color_code: "#1e3a8a" }
  ];

  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  return (
    <div
      className="flex flex-col gap-5 md:w-[182px] xl:w-[348px] xl:p-6 h-fit rounded-[5px] xl:shadow-xl max-md:max-h-[calc(100vh-15vh)] max-md:overflow-y-auto max-md:hidden bg-transparent"
    >
      <button
        className="max-md:hidden btn min-h-[fit-content] h-12 xl:h-[68px] text-sm text-sub-work-card border border-black rounded-md border-none lg:drop-shadow-md hover:bg-yellow-primary/70 font-medium bg-white"
      >
        T-Shirts
      </button>

      <button
        className="max-md:hidden btn min-h-[fit-content] h-12 xl:h-[68px] text-sm text-sub-work-card border border-black rounded-md border-none lg:drop-shadow-md hover:bg-yellow-primary/70 font-medium bg-white"
      >
        Hoodies
      </button>

      <hr className="hidden lg:block" />

      <div className="flex flex-col gap-9">
        <p className="text-gray-700 text-lg font-semibold">Color</p>
        <ColorSelection
          data={colorData}
          selectedColor={selectedColors}
          changeColorByUrl={handleColorChange}
        />
      </div>
    </div>
  );
};