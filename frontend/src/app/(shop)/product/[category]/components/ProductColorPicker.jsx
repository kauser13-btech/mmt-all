'use client';

export default function ProductColorPicker({ data }) {
  // Example static product info (could come from props too)
  const product = {
    color: "Red",
    type: "t-shirt",
    sneaker: "jordan-1",
    design: "match",
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <p className="font-roboto text-base md:text-sm xl:text-base">
        Color: <span className="font-medium">{product.color}</span>
      </p>

      <div className="flex flex-wrap gap-3">
        {data?.available_colors?.map((c) => (
          <button
            key={c.code}
            aria-label={`Select ${c.name || c.code}`}
            title={c.name || c.code}
            className={`size-5 md:size-6 xl:size-[30px] rounded-[5px] border transition-transform duration-200 hover:scale-110 focus:outline-none ${c.is_selected
              ? "border-2 border-orange-primary"
              : "border border-gray-secondary"
              }`}
            style={{ backgroundColor: c.code }}
          />
        ))}
      </div>
    </div>
  );
}
