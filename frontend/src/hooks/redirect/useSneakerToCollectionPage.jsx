import { useRouter } from 'next-nprogress-bar';

const useSneakerToCollectionPage = () => {
  const router = useRouter();
  const navigateSneakerToCollectionPage = (
    sneakerSlug,
    brandSlug,
    modelSlug,
    subModelCategorySlug,
    productType
  ) => {
    router.push(
      `/collection?brand=${brandSlug}&model=${modelSlug}&sub_model_category=${subModelCategorySlug}&sneaker=${sneakerSlug}&product_type=${productType}&product_colors=&designs`
    );
  };

  return navigateSneakerToCollectionPage;
};

export default useSneakerToCollectionPage;
