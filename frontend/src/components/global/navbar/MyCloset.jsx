"use client";
import { useCloset } from "@/context/ClosetContex";
import useDeleteClosetData from "@/hooks/closets/useDeleteClosetData";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import TailwindDrawer from "../drawerMenu/TailwindDrawer";
import DaisyModal from "../modal/DaisyModal";
import SneakerModal from "../searchSneakerModal/SneakerModal";
import useSneakerToCollectionPage from "@/hooks/redirect/useSneakerToCollectionPage";
import { useUserName } from "@/context/UserNameContext";
import Link from "next/link";
import Search from "../../landing/Search";
import useToggle from "@/hooks/useToggle";

export const MyCloset = ({ isClosetOpen, setIsOpen }) => {
  const { getClosetData, data } = useCloset();
  const { getUser } = useUserName();
  const { isOpen, toggle } = useToggle();

  const handleDelete = useDeleteClosetData();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onDeleteClick = async (id) => {
    await handleDelete(id);
    getClosetData();
  };

  useEffect(() => {
    getClosetData();
  }, []);

  useEffect(() => {
    const colsetCategoryModal = document.getElementById(
      "closet_category_modal"
    );
    if (colsetCategoryModal) {
      colsetCategoryModal.close();
    }
  }, [router.asPath]);

  const handleSneakerToProduct = (
    brandSlug,
    modelSlug,
    subCategorySlug,
    sneakerSlug,
    productType
  ) => {
    router.push(
      `/collection?brand=${brandSlug}&model=${modelSlug}&sub_model_category=${subCategorySlug}&sneaker=${sneakerSlug}&product_type=${productType}&product_colors=&designs`
    );
  };

  const navigateSneakerToCollectionPage = useSneakerToCollectionPage();

  const handleChangeSneaker = (
    sneakerSlug,
    brandSlug,
    modelSlug,
    subModelCategorySlug,
    productType
  ) => {
    return "Redirect2";
    navigateSneakerToCollectionPage(
      sneakerSlug,
      brandSlug,
      modelSlug,
      subModelCategorySlug,
      productType
    );
  };

  return (
    <div>
      <TailwindDrawer
        isOpen={isClosetOpen}
        setIsOpen={setIsOpen}
        position="right"
      >
        <div className="flex flex-col gap-9 relative">
          <div className="flex items-center gap-5 max-md:px-10 md:px-[60px]">
            <img src="/images/closet.svg" alt="cart" />
            <h3>My Closet - {data.length > 0 ? data.length : 0} items</h3>
          </div>
          <div className="bg-[#e7e7e7] py-2">
            {getUser ? (
              <p className="max-md:px-10 md:px-[60px]">
                You can add up to 8 sneakers in your closet!
              </p>
            ) : (
              <p className="max-md:px-10 md:px-[60px]">
                Please{" "}
                <Link className="text-blue-400 underline" href="/sign-in/">
                  login
                </Link>{" "}
                or{" "}
                <Link className="text-blue-400 underline" href="/sign-up/">
                  register
                </Link>{" "}
                to get your closet.
              </p>
            )}
          </div>
          <div className="max-md:px-10 md:px-[60px]">
            <Search
              type="drawer_closet"
              handleChangeSneaker={handleChangeSneaker}
              isOpen={isOpen}
              toggle={toggle}
            />
          </div>
          <div className="md:px-[60px] flex flex-col gap-5 h-[calc(100vh-31vh)] overflow-y-auto">
            {data.map((sneaker) => (
              <div className="flex items-center gap-8 w-full" key={sneaker.id}>
                <div className="min-w-20 min-h-[66px] max-w-20 max-h-[66px] px-[5px] py-3 flex items-center justify-center">
                  <img
                    onClick={(e) => {
                      handleSneakerToProduct(
                        sneaker.brand,
                        sneaker.model,
                        sneaker.sub_model_category,
                        sneaker.slug,
                        "T-shirt"
                      );
                      setIsOpen(!isClosetOpen);
                    }}
                    className="w-full h-auto"
                    src={sneaker.image_url}
                    alt={sneaker.title}
                  />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  className="flex items-center gap-16 w-full justify-between"
                >
                  <p
                    onClick={(e) => {
                      handleSneakerToProduct(
                        sneaker.brand,
                        sneaker.model,
                        sneaker.sub_model_category,
                        sneaker.slug,
                        "T-shirt"
                      );
                      setIsOpen(!isClosetOpen);
                    }}
                    className="max-w-[204px] text-sub-work-card"
                  >
                    {sneaker.sneaker_title}
                  </p>
                  <button
                    onClick={(e) => {
                      onDeleteClick(sneaker.id);
                    }}
                    className="hover:underline font-roboto text-base text-sub-work-card"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:px-[60px]">
            {/* <button
              onClick={() => {
                setTimeout(() => {
                  document.getElementById("closet_category_modal").showModal();
                }, 100);
                setIsOpen(!isOpen);
                clearTimeout();
              }}
              className="btn w-full flex items-center justify-between bg-yellow-primary hover:bg-yellow-primary/80 
              active:bg-yellow-primary/90 border-none text-black text-sm font-normal md:text-base md:font-medium lg:text-[22px] lg:font-normal"
            >
              <p>Add new sneakers</p>
              <svg
                className=""
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M16.7207 14.4753L13.5106 11.463C14.5464 10.2211 15.1083 8.68756 15.1062 7.10882C15.1062 5.70283 14.6633 4.32841 13.8333 3.15937C13.0034 1.99033 11.8237 1.07918 10.4436 0.54113C9.06343 0.00308013 7.54475 -0.137698 6.07958 0.136597C4.61442 0.410893 3.26858 1.08794 2.21226 2.08213C1.15594 3.07631 0.436573 4.34299 0.145134 5.72196C-0.146304 7.10094 0.00327264 8.53028 0.57495 9.82925C1.14663 11.1282 2.11473 12.2385 3.35684 13.0196C4.59894 13.8007 6.05926 14.2176 7.55312 14.2176C9.23053 14.2196 10.8599 13.6907 12.1794 12.7159L15.38 15.7372C15.4678 15.8204 15.5722 15.8865 15.6873 15.9317C15.8023 15.9768 15.9257 16 16.0504 16C16.175 16 16.2984 15.9768 16.4135 15.9317C16.5285 15.8865 16.633 15.8204 16.7207 15.7372C16.8092 15.6545 16.8795 15.5563 16.9274 15.448C16.9753 15.3397 17 15.2236 17 15.1062C17 14.9889 16.9753 14.8728 16.9274 14.7645C16.8795 14.6562 16.8092 14.5579 16.7207 14.4753ZM1.88828 7.10882C1.88828 6.05433 2.22052 5.02352 2.84298 4.14674C3.46544 3.26996 4.35017 2.58659 5.38528 2.18305C6.4204 1.77952 7.55941 1.67393 8.65828 1.87965C9.75715 2.08537 10.7665 2.59316 11.5588 3.3388C12.351 4.08444 12.8905 5.03444 13.1091 6.06868C13.3277 7.10291 13.2155 8.17492 12.7868 9.14914C12.358 10.1234 11.6319 10.9561 10.7003 11.5419C9.76876 12.1277 8.67352 12.4404 7.55312 12.4404C6.05071 12.4404 4.60984 11.8787 3.54748 10.8788C2.48511 9.87897 1.88828 8.52285 1.88828 7.10882Z"
                  fill="#474747"
                />
              </svg>
            </button> */}
            <DaisyModal
              modalId="closet_category_modal"
              background="bg-white max-w-[1460px] h-fit max-lg:h-[400px] lg:h-[727px] p-0 overflow-hidden"
            >
              <div className="relative max-lg:h-[400px] lg:h-[727px] overflow-y-auto">
                <SneakerModal
                  modalId="closet_category_modal"
                  handleChangeSneaker={handleChangeSneaker}
                  type="closet_outfit"
                />
                <button
                  className="modal-close text-black absolute top-0 right-0 self-end m-6"
                  onClick={() =>
                    document.getElementById("closet_category_modal").close()
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
                </button>
              </div>
            </DaisyModal>
          </div>
        </div>
      </TailwindDrawer>
    </div>
  );
};
