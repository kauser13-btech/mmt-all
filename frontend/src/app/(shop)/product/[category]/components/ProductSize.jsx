'use client';

export default function ProductSize({ size, setSize }) {
  const size_variants = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-roboto text-base font-normal text-sub-work-card md:text-sm xl:text-base">
          Size: <span className="ml-2 font-semibold">{size}</span>
        </p>
        <button
          type="button"
          className="font-roboto text-base font-normal text-blue-500 transition-all duration-300 hover:text-blue-700 hover:underline focus:outline-none md:text-sm xl:text-base"
        >
          Size guide
        </button>
      </div>

      {/* Size options */}
      <div className="ml-1 flex flex-wrap gap-[7px] md:gap-[11px]">
        {size_variants.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => setSize(variant)}
            aria-label={`Select size ${variant}`}
            className={`flex size-8 items-center justify-center rounded-[3px] text-xs md:size-[34px] md:rounded-md xl:text-base lg:h-[37px] lg:w-[48px] transition-transform duration-200 hover:scale-110
              ${size === variant
                ? "bg-black text-white"
                : "bg-[#e3e3e3] text-title-work-card"
              }`}
          >
            {variant}
          </button>
        ))}
      </div>
    </div>
  );
}
