export default function ProductPrice({ targetPrice, mainPrice }) {

  const discount = (100 - ((parseFloat(targetPrice.replace(/[^\d.]/g, ''))) / parseFloat(mainPrice.replace(/[^\d.]/g, '')) * 100)).toFixed(2);

  return (
    <div className="flex flex-col lg:flex-col gap-y-0">
      <div className="flex items-center gap-2.5 md:m-1.5 xl:gap-2.5 min-w-full">
        <h2 className="max-md:min-w-[68px] font-roboto text-orange-primary font-medium text-xl md:font-semibold md:tracking-[-0.42px] 
          md:text-2xl 2xl:tracking-[-0.72px] md:min-w-fit">{targetPrice}</h2>

        {
          (discount > 0) &&
          <>
            <p className="text-sub-work-card line-through mt-0 font-normal text-sm p-1">{mainPrice}</p>
            <p className="max-md:min-w-[68px] font-roboto text-orange-primary font-normal text-base md:tracking-[-0.42px] 2xl:tracking-[-0.72px] md:min-w-fit">You Save {discount}%</p>
          </>
        }

      </div>
    </div>
  );
};
