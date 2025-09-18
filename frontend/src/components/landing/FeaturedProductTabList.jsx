"use client";
import ApiCall from "@/lib/util/ApiCall";
import { useEffect, useState } from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import { useRouter } from 'next-nprogress-bar';
import DaisyModal from "../global/modal/DaisyModal";
import SneakerModal from "../global/searchSneakerModal/SneakerModal";
import Rodal from "rodal";

function FeaturedProductTabList({ toggleTab }) {
  const [showFeaturedModal, setShowFeaturedModal] = useState(false)
  const [dataJustDropped, setDataJustDropped] = useState([]);
  const [dataClassic, setDataClassic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { performGet } = ApiCall();
  const [productModal, setProductModal] = useState({
    type: "",
    color: "",
    design: "",
  });

  const handleProductChange = (type, color, design) => {
    setProductModal({
      type: type,
      color: color,
      design: design,
    });
    // document.getElementById("featured_category_modal").showModal();
    setShowFeaturedModal(true)
  };

  const [imageLoaded, setImageLoaded] = useState(Array(12).fill(false));
  const [displayedItems, setDisplayedItems] = useState(12);

  const handleImageLoaded = (index) => {
    setImageLoaded((prevImageLoaded) => {
      const newImageLoaded = [...prevImageLoaded];
      newImageLoaded[index] = true;
      return newImageLoaded;
    });
  };

  const router = useRouter();
  const handleChangeSneaker = (sneaker) => {
    router.push(
      `/product?type=${productModal.type}&color=${productModal.color}&sneaker=${sneaker}&design=${productModal.design}`
    );
  };

  const handleFeatureProduct = async () => {
    const response = await performGet(`api/v1/get-featured-products`);

    if (response.success) {
      setIsLoading(false);
      setDataJustDropped(response.data.just_dropped);
      setDataClassic(response.data.classic);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    document.body.style.overflow = showFeaturedModal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFeaturedModal]);

  useEffect(() => {
    handleFeatureProduct();
  }, []);
  return (
    <>
      <div className={toggleTab === 1 ? "grid gap-2.5 md:gap-4 xl:gap-x-9 xl:gap-y-[83px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" : "hidden"}>
        <FeaturedProductCard
          data={dataJustDropped}
          isLoading={isLoading}
          handleImageLoaded={handleImageLoaded}
          imageLoaded={imageLoaded}
          type={"outfit"}
          outfitOpenModal={handleProductChange}
          handleChangeSneaker={handleChangeSneaker}
        />
      </div>
      <div className={toggleTab === 2 ? "grid gap-2.5 md:gap-4 xl:gap-x-9 xl:gap-y-[83px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" : "hidden"}>
        <FeaturedProductCard
          data={dataClassic}
          isLoading={isLoading}
          handleImageLoaded={handleImageLoaded}
          imageLoaded={imageLoaded}
          type={"outfit"}
          outfitOpenModal={handleProductChange}
          handleChangeSneaker={handleChangeSneaker}
        />
      </div>

      <Rodal customStyles={{ width: 'fit-content', height: 'fit-content', background: 'transparent', boxShadow: 'none' }} visible={showFeaturedModal} onClose={() => setShowFeaturedModal(!showFeaturedModal)}>
        <div className="relative bg-white w-full max-w-[1463px] rounded-xl max-lg:h-[400px] lg:h-[727px] overflow-y-auto">
          <SneakerModal
            productModal={productModal}
            handleChangeSneaker={handleChangeSneaker}
            modalId="featured_category_modal"
            type="outfit"
          />
          {/* <button
            className="modal-close text-black absolute top-0 right-0 self-end m-6"
            onClick={() =>
              document.getElementById("outfit_category_modal").close()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>
      </Rodal>
    </>
  );
}

export default FeaturedProductTabList;
