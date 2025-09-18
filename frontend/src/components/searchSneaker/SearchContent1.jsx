"use client";
import useGetClosetData from "@/hooks/closets/useGetClosetData";
import usePostCloseData from "@/hooks/closets/usePostCloseData";
import useSneakersSearch from "@/hooks/sneakerSearch/useSneakerSearch";
import useToggle from "@/hooks/useToggle";
import { useEffect, useRef, useState } from "react";
import SearchItemContainer from "./SearchItemContainer1";
import SearchUtil from "./SearchUtil";
import { useUserName } from "@/context/UserNameContext";
import { useCloset } from "@/context/ClosetContex";
const SearchContent = ({
  handleChangeSneaker,
  type,
  productModal,
  modalId,
}) => {
  const { isOpen, toggle } = useToggle();
  const { getUser } = useUserName();
  const bottom = useRef(null);
  const [isAddedCloset, setIsAddedCloset] = useState(false);

  const {
    searchParams,
    setSearchParams,
    searchResults,
    fetchResults,
    page,
    hasMoreData,
    isLoading,
    fetchData,
  } = useSneakersSearch();

  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };

  useEffect(() => {
    const handleInfiniteScroll = async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        await fetchData();
      }
    };

    const observer = new IntersectionObserver(handleInfiniteScroll, {
      root: null,
      rootMargin: "10px",
      threshold: 0,
    });

    if (bottom.current) {
      observer.observe(bottom.current);
    }

    return () => {
      if (bottom.current) {
        observer.unobserve(bottom.current);
      }
    };
  }, [isOpen, page, searchParams]);

  const { getClosetData, data } = useCloset();

  const { handleAddToCloset } = usePostCloseData();

  const handlePostCloset = async (id) => {
    type == "home" && document.getElementById(modalId).close();
    getUser
      ? ""
      : document.getElementById("sign-in-modal-in-search").showModal();
    await handleAddToCloset(type, id);
    setIsAddedCloset(true);
    toggle(false);
    getClosetData();
  };

  return (
    <div className="w-full flex flex-col gap-6 xl:gap-9 mt-6 lg:pr-14 lg:pt-16">
      <h2 className="font-roboto text-sm md:text-xl xl:text-2xl lg:font-medium text-title-work-card">
        We got your T-Shirt and Design, Now tell us what shoes in your
        collection.
      </h2>
      <div className="flex flex-col gap-4 xl:gap-6">
        <SearchUtil
          toggle={toggle}
          handleChange={handleChange}
          searchParams={searchParams}
          searchResults={searchResults}
          fetchResults={fetchResults}
          bottom={bottom}
          hasMoreData={hasMoreData}
          handlePostCloset={handlePostCloset}
          handleChangeSneaker={handleChangeSneaker}
          isOpen={isOpen}
          isLoading={isLoading}
          type={type}
        />
        <h3 className="text-black font-roboto text-sm md:text-base xl:text-[22px] font-normal leading-none">
          Or, Select item from your closet:
        </h3>
      </div>
      <SearchItemContainer productModal={productModal} data={data} />
    </div>
  );
};

export default SearchContent;
