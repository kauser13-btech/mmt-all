import ProductComponent from "../global/ProductComponent";

const OutfitProductCard = ({
  data,
  isLoading,
  handleImageLoaded,
  imageLoaded,
  type,
  outfitOpenModal,
  handleChangeSneaker,
}) => {
  return (
    <ProductComponent
      products={data}
      isLoading={isLoading}
      imageLoaded={imageLoaded}
      handleImageLoaded={handleImageLoaded}
      type={type}
      outfitOpenModal={outfitOpenModal}
      handleChangeSneaker={handleChangeSneaker}
    />
  );
};

export default OutfitProductCard;
