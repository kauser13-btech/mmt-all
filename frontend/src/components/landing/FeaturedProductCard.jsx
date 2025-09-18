import React from "react";
import ProductComponent from "../global/ProductComponent";

const FeaturedProductCard = ({
  data,
  isLoading,
  handleImageLoaded,
  imageLoaded,
  type,
  outfitOpenModal
}) => {
  return (
    <ProductComponent
      products={data}
      isLoading={isLoading}
      handleImageLoaded={handleImageLoaded}
      imageLoaded={imageLoaded}
      type={type}
      outfitOpenModal={outfitOpenModal}
    />
  );
};

export default FeaturedProductCard;
