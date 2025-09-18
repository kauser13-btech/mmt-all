import { useCloset } from "@/context/ClosetContex";
import useDeleteClosetData from "@/hooks/closets/useDeleteClosetData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import TailwindLoader from "../TailwindLoader";

const SearchResult = ({
  sneakers,
  bottom,
  isLoading,
  handlePostCloset,
  handleChangeSneaker,
  type,
  isOpen,
  containerRef,
}) => {
  const handleDelete = useDeleteClosetData();
  const onDeleteClick = async (id) => {
    const closet = data.find((item) => item.sneaker_id == id);
    await handleDelete(closet.id);
    getClosetData();
  };
  const { data, getClosetData } = useCloset();
  return (
    <div
      className={`${type === "collection"
        ? ""
        : type === "home"
          ? ""
          : type === "home" && isOpen
            ? ""
            : ""
        } p-3 lg:p-6 max-h-96 max-h-96 max-lg:max-h-64 overflow-y-scroll rounded-xl flex flex-col gap-2`}
      ref={containerRef}
    >
      {isLoading && sneakers.length === 0
        ? // Render Skeleton components during loading

        Array.from({ length: 4 }).map((_, index) => (
          <div className="flex items-center gap-8 w-full" key={index}>
            <div className="flex flex-col gap-2.5 w-full">
              <TailwindLoader height={"h-4 md:h-6 max-w-xs"} />
              <TailwindLoader height={"!max-w-[101px]  h-3 md:h-6"} />
            </div>
            <div className="flex items-center gap-2 md:gap-5">
              <TailwindLoader height={"!min-w-[56px] h-[56px]"} />
              <TailwindLoader
                height={"!min-w-[20px] !min-h-[20px] md:w-[30px] md:h-[30px]"}
              />
            </div>
          </div>
        ))
        : // Render actual data when not loading
        sneakers.map((sneaker) => {
          const ids = data.map((item) => item.slug);
          return (
            <div
              className={`${type === "collection" ? "" : type === "home" ? "" : ""
                } flex items-center justify-between w-full gap-2 cursor-pointer group`}
              key={sneaker.id}
            >
              <div
                className="font-roboto text-title-work-card text-xs md:text-sm xl:text-xl font-normal group-hover:text-orange-primary flex flex-col gap-2.5"

              >
                <p className="cursor-pointer" onClick={(e) =>
                  type === "home"
                    ? handleChangeSneaker(
                      sneaker.slug,
                      sneaker.brand.slug,
                      sneaker.model.slug,
                      sneaker.sub_model_category.slug,
                      "T-shirt"
                    )
                    : type === "closet_outfit"
                      ? handleChangeSneaker(
                        sneaker.slug,
                        sneaker.brand.slug,
                        sneaker.model.slug,
                        sneaker.sub_model_category.slug,
                        "T-shirt"
                      )
                      : handleChangeSneaker(
                        sneaker.slug,
                        sneaker.brand.slug,
                        sneaker.model.slug,
                        sneaker.sub_model_category.slug,
                        "T-shirt"
                      )
                }>{sneaker.original_title}</p>
                <div className="max-[420px]:hidden max-w-[125px] h-5 bg-orange-primary rounded-[5px] group-hover:visible flex items-center justify-center invisible">
                  {type === "collection" ? (

                    !ids.includes(sneaker.slug) ? (
                      <p onClick={(e) => handlePostCloset(sneaker.id)} className="text-white text-xs font-normal font-roboto leading-none cursor-pointer">
                        Add to closet?
                      </p>

                    ) : (
                      <p onClick={(e) => {
                        onDeleteClick(sneaker.id);
                      }} className="text-white text-xs font-normal font-roboto leading-none cursor-pointer">
                        Remove from closet?
                      </p>
                    )
                  ) : (
                    !ids.includes(sneaker.slug) ? (
                      <p onClick={(e) => handlePostCloset(sneaker.id)} className="text-white text-xs font-normal font-roboto leading-none cursor-pointer">
                        Add to closet?
                      </p>

                    ) : (
                      <p onClick={(e) => {
                        onDeleteClick(sneaker.id);
                      }} className="text-white text-xs font-normal font-roboto leading-none cursor-pointer">
                        Remove from closet?
                      </p>
                    )
                  )}

                </div>
              </div>
              {type === "collection" ? (
                <div className="flex items-center gap-7 max-xl:min-w-[113px] max-xl:max-w-[113px] xl:min-w-32">
                  <img
                    className="w-16 h-auto xl:w-20 group-hover:scale-110 duration-300"
                    src={sneaker.sneaker_image}
                    alt="sneaker"
                  />
                  {!ids.includes(sneaker.slug) ? (
                    <svg
                      className="stroke-[#161616] group-hover:stroke-white min-w-5 min-h-5 group-hover:bg-orange-primary group-hover:rounded-full"
                      onClick={(e) => handlePostCloset(sneaker.id)}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M6.41602 10.999H15.5827"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.999 15.583L10.999 6.41634"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="stroke-[#161616] group-hover:stroke-white min-w-5 min-h-5 group-hover:bg-orange-primary group-hover:rounded-full"
                      onClick={(e) => {
                        onDeleteClick(sneaker.id);
                      }}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M6.41602 10.999H15.5827"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* <path
                        d="M10.999 15.583L10.999 6.41634"
                        strokeWidth="2"
                        strokeLinecap="round"
                      /> */}
                    </svg>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-5  max-xl:min-w-[113px] max-xl:max-w-[113px] xl:min-w-32">
                  <img
                    className="w-14 h-auto xl:w-20 group-hover:scale-110 duration-300"
                    src={sneaker.sneaker_image}
                    alt="sneaker"
                  />
                  {!ids.includes(sneaker.slug) ? (
                    <svg
                      className="stroke-[#161616] group-hover:stroke-white min-w-5 min-h-5 group-hover:bg-orange-primary group-hover:rounded-full"
                      onClick={(e) => handlePostCloset(sneaker.id)}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M6.41602 10.999H15.5827"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.999 15.583L10.999 6.41634"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="stroke-[#161616] group-hover:stroke-white min-w-5 min-h-5 group-hover:bg-orange-primary group-hover:rounded-full"
                      onClick={(e) => {
                        onDeleteClick(sneaker.id);
                      }}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M6.41602 10.999H15.5827"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* <path
                        d="M10.999 15.583L10.999 6.41634"
                        strokeWidth="2"
                        strokeLinecap="round"
                      /> */}
                    </svg>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;
