import ProductImageCarousel from "./ProductImageCarousel";

export default function ProductImageWrapper({ data }) {
  return (

    <div className="flex flex-col max-md:gap-11 min-w-full">
      {/* Mobile Title */}
      <h1 className="md:hidden font-staatliches text-xl font-normal">
        {data?.title}
      </h1>


      <div className="relative flex flex-col-reverse gap-2 xl:gap-10 2xl:flex-row">
        <ProductImageCarousel
          images={data?.image_urls || []}
          imageAlt="Demo Sneaker"
        />
      </div>
    </div>

  )
}