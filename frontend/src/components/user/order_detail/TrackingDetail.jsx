import React from "react";

const TrackingDetail = ({ data, loading }) => {
  return loading ? (
    <p>Loading</p>
  ) : (<div className="bg-white rounded-lg shadow-lg lg:rounded-none lg:shadow-none">
        <div className="lg:w-full mt-5 overflow-x-auto flex flex-col lg:block">
      <p className="self-center px-10 pt-[17px]">Estimated delivery date</p>
      <div className="justify-center  lg:justify-start px-10 py-[20px] mr-auto  mb-auto ml-auto flex lg:flex-row flex-col space-x-0 lg:space-x-[90px] ">
        <div className="py-1 self-center lg:self-start ">
          <h3 className="text-[20px] font-medium ">Tuesday</h3>
          <div className="text-[36px] font-medium text-[#05a5ac]">
            24
            <span className="text-base px-[5px]">Jan</span>
          </div>
        </div>

        <div className="border-r-black border-r py-1 hidden lg:block"></div>

        <div className="py-1 self-center lg:self-start">
          <h3 className="text-xl font-medium">Just Shipped</h3>
          <img
            className="pt-[15px]"
            src="/images/deliveryTimestamp.svg"
            alt=""
          />
        </div>

      </div>
    </div>
    
  </div>);
};

export default TrackingDetail;
