"use client";
import useModal from "@/hooks/useModal";
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from "react";
import OutfitProductCard from "./OutfitProductCard";
import SneakerModal from "../global/searchSneakerModal/SneakerModal";
import Rodal from "rodal";

function OutfitCategoryTabList({
  toggleTab,
  dataTShirt,
  dataHoodies,
  isLoading,
  imageLoaded,
  handleImageLoaded,
}) {
  const { modalHandle, isOpen } = useModal();
  const [showOutfitModal, setShowOutfitModal] = useState(false)

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
    // document.getElementById("outfit_category_modal").showModal();
    setShowOutfitModal(true)
  };

  useEffect(() => {
    document.body.style.overflow = showOutfitModal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOutfitModal]);

  const router = useRouter();
  const handleChangeSneaker = (sneaker) => {
    router.push(
      `/product?type=${productModal.type}&color=${productModal.color}&sneaker=${sneaker}&design=${productModal.design}`
    );
  };
  return (
    <>
      <div className={toggleTab === 1 ? "grid gap-2.5 md:gap-4 xl:gap-x-9 xl:gap-y-[83px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" : "hidden"}>
        <OutfitProductCard
          data={dataTShirt}
          imageLoaded={imageLoaded}
          isLoading={isLoading}
          handleImageLoaded={handleImageLoaded}
          type="outfit"
          outfitOpenModal={handleProductChange}
          handleChangeSneaker={handleChangeSneaker}
        />
      </div>
      <div className={toggleTab === 2 ? "grid gap-2.5 md:gap-4 xl:gap-x-9 xl:gap-y-[83px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" : "hidden"}>
        <OutfitProductCard
          data={dataHoodies}
          imageLoaded={imageLoaded}
          isLoading={isLoading}
          handleImageLoaded={handleImageLoaded}
          type="outfit"
          outfitOpenModal={handleProductChange}
          handleChangeSneaker={handleChangeSneaker}
        />
      </div>
      <Rodal customStyles={{ width: 'fit-content', height: 'fit-content', background: 'transparent', boxShadow: 'none' }} visible={showOutfitModal} onClose={() => setShowOutfitModal(!showOutfitModal)}>
        <div className="relative bg-white w-full max-w-[1463px] rounded-xl max-lg:h-[400px] lg:h-[727px] overflow-y-auto">
          <SneakerModal
            modalHandle={modalHandle}
            handleChangeSneaker={handleChangeSneaker}
            modalId="outfit_category_modal"
            type="outfit"
            productModal={productModal}
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

export default OutfitCategoryTabList;
