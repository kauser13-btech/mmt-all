import ProductPrice from "./ProductPrice";
import SizeAndColorWrapper from "./SizeAndColorWrapper";

export default function ProductContainer({ data, sneaker, design }) {
  const size = "M";
  const filterColor = data?.available_colors?.find(
    (color) => color.is_selected === true,
  );

  return (
    <div className="w-full flex flex-col gap-6s md:gap-6 relative">
      <h2 className="max-md:hidden w-full font-staatliches text-lg lg:text-2xl xl:text-[32px] font-normal text-sub-work-card">
        {data.title}
      </h2>

      <div className="w-full overflow-auto hideScroll flex flex-col gap-1 md:justify-start">
        <ProductPrice
          targetPrice={data?.price}
          mainPrice="$59.9"
        />
      </div>

      <SizeAndColorWrapper
        sneaker={sneaker}
        design={design}
        data={data}
      />
    </div>
  );
};
