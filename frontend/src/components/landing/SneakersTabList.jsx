import React from "react";
import SneakersProductCard from "./SneakersProductCard";
import useSneakerToCollectionPage from "@/hooks/redirect/useSneakerToCollectionPage";
const SneakersTabList = ({
  toggleTab,
  bestSeller,
  recentlyAdded,
  isLoading,
}) => {
  const navigateSneakerToCollectionPage = useSneakerToCollectionPage();

  const sneakerToCollectionPage = (
    sneakerSlug,
    brandSlug,
    modelSlug,
    subModelCategorySlug,
    productType
  ) => {
    navigateSneakerToCollectionPage(
      sneakerSlug,
      brandSlug,
      modelSlug,
      subModelCategorySlug,
      productType
    );
  };

  return (
    <>
      <div className={toggleTab === 1 ? "" : "hidden"}>
        <SneakersProductCard
          data={recentlyAdded}
          isLoading={isLoading}
          sneakerToCollectionPage={sneakerToCollectionPage}
        />
      </div>
      <div className={toggleTab === 2 ? "" : "hidden"}>
        <SneakersProductCard
          data={bestSeller}
          isLoading={isLoading}
          sneakerToCollectionPage={sneakerToCollectionPage}
        />
      </div>
    </>
  );
};

export default SneakersTabList;
