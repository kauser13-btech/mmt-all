import { useRouter } from 'next-nprogress-bar';

const SneakerItem = ({ data, productModal }) => {
  const router = useRouter();

  const handleSneakerToProduct = (
    brandSlug,
    modelSlug,
    subCategorySlug,
    sneakerSlug,
    productType
  ) => {
    !productModal ? router.push(
      `/collection?brand=${brandSlug}&model=${modelSlug}&sub_model_category=${subCategorySlug}&sneaker=${sneakerSlug}&product_type=${productType}&product_colors=&designs`
    ) : router.push(
      `/product?type=${productModal.type}&color=${productModal.color}&sneaker=${sneakerSlug}&design=${productModal.design}`
      );
  };
  return (
    <>
      {data.length !== 0 &&
        data.map((sneaker) => (
          <div
            className="flex flex-col gap-4 cursor-pointer group"
            key={sneaker.id}
            onClick={(e) =>
              handleSneakerToProduct(
                sneaker.brand,
                sneaker.model,
                sneaker.sub_model_category,
                sneaker.slug,
                "T-shirt"
              )
            }
          >
            <div className="size-[122px] flex items-center justify-center rounded-[10px] bg-[#E7E7E7]">
              <img className="w-20 h-auto group-hover:scale-110 duration-200" src={sneaker.image_url} alt={sneaker.sneaker_title} />
            </div>
            <p className="w-[122px] font-roboto text-base font-normal max-lg:hidden text-title-work-card">{sneaker?.sneaker_title?.substring(0, 27)}...</p>
          </div>
        ))}
    </>
  );
};

export default SneakerItem;
