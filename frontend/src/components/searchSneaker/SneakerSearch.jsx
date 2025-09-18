export default function SneakerSearch() {
  return (
    <div
      className={"w-full flex sm:grow-0 justify-between px-3 gap-x-1 lg:grow shadow-md h-12 xl:h-[64px] items-center rounded-lg"
      }
    >
      <input
        type="text"
        className="size-full text-sm md:text-base xl:text-lx focus:outline-none border-none gap-4 p-4 max-md:pr-10 md:py-[13px] xl:py-[15px] xl:px-8 placeholder:text-title-work-card placeholder:font-medium xl:placeholder:font-normal focus:placeholder-custom-search-focus"
        placeholder="Search sneakers to match"
      // onClick={() => handleOnClick(true)}
      // onChange={(e) => handleChange(e)}
      />
    </div>
  );
};