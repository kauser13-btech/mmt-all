const BreadcrumbResponsive = ({ title }) => {
  return (
    <>
      <div className="bg-transparent sm:bg-[#f7f7f7] ">
        <div className="my-container">
          <p className="py-2 text-[10px] text-gray-700 sm:text-xs font-roboto font-normal">{title}</p>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbResponsive;
