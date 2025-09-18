import React from "react";
import Skeleton from "react-loading-skeleton";
const ShippingAddress = ({ data, loading }) => {
  return loading ? (
    <div className="bg-white p-8 rounded-lg shadow-lg lg:rounded-none lg:shadow-none">
      <div className="text-[#5E5D72] font-roboto font-semibold pb-4 border-b border-b-[##D9D9D9]">
        Shipping address
      </div>
      <ul className="lg:w-[290px] space-y-[10px] text-[#5E5D72] font-roboto text-base font-normal">
        <li className=" flex justify-between pt-[15px]">
          {" "}
          <p>Country</p>
          <Skeleton count={1} width={100} />
        </li>
        <li className="flex justify-between">
          <p>City</p>
          <Skeleton count={1} width={100} />
        </li>
        <li className="flex justify-between">
          <p>State</p>
          <Skeleton count={1} width={100} />
        </li>
        <li className="flex justify-between">
          <p>Address</p>
          <Skeleton count={1} width={100} />
        </li>
        <li className="flex justify-between">
          <p>Zip</p>
          <Skeleton count={1} width={100} />
        </li>
      </ul>
    </div>
  ) : (
    <div className="bg-white p-8 rounded-lg shadow-lg lg:rounded-none lg:shadow-none">
      <div className="text-[#5E5D72] font-roboto font-semibold pb-4 border-b border-b-[##D9D9D9]">
        Shipping address
      </div>
      <ul className="lg:w-[290px] space-y-[10px] text-[#5E5D72] font-roboto text-base font-normal">
        <li className=" flex justify-between pt-[15px]">
          {" "}
          <p>Country</p>
          <p>{data?.details?.shipping_details?.country_name}</p>
        </li>
        <li className="flex justify-between">
          <p>City</p>
          <p>{data?.details?.shipping_details?.city}</p>
        </li>
        <li className="flex justify-between">
          <p>State</p>
          <p>{data?.details?.shipping_details?.state_name}</p>
        </li>
        <li className="flex justify-between">
          <p>Address</p>
          <p>{data?.details?.shipping_details?.address1}</p>
        </li>
        <li className="flex justify-between">
          <p>Zip</p>
          <p>{data?.details?.shipping_details?.zip}</p>
        </li>
      </ul>
    </div>
  );
};

export default ShippingAddress;
