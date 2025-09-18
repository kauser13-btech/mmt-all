
const LoadingButton = ({ loadMore }) => {
  return (
    <button className="btn bg-orange-primary border-none text-white text-sm md:text-base md:font-medium xl:font-normal hover:bg-orange-primary/80 
    active:bg-orange-primary/90 w-fit px-6 md:px-8 xl:px-14" onClick={(e) => loadMore()}>
      <p className=" !leading-[unset]">Load More</p>
    </button>
  );
};

export default LoadingButton;
