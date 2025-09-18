import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
const ProductDetail = ({ data, loading }) => {
  const handleImageLoad = () => {
    setimgLoading(false);
  };
  const [imgloading, setimgLoading] = useState(true);
  const placeholderImage = "/images/placeholder.jpg";

  return loading ? (
    <div className="bg-white font-roboto text-base font-medium p-8 rounded-lg shadow-lg lg:rounded-none lg:shadow-none">
      <p className="text-[#05A5AC]  border-b-[#D9D9D9] border-b-[0.03125rem] pb-4">
        <Skeleton count={1} />
      </p>

      <div className="overflow-auto hideScroll max-h-[53vh]">
        <table className="table block">
          <thead>
            <tr className="border-b-0 text-[#5E5D72] font-roboto text-base font-semibold text-center">
              <th className="w-[300px] text-start">Product</th>
              <th className="">Quantity</th>
              <th className="text-end">Price</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="border-b-0 text-center text-[#474747] font-roboto text-[0.875rem] ">
              <td className="flex w-[300px]  justify-between text-end ">
                <Skeleton count={1} height={100} width={100} />
                <Skeleton count={5} width={100} />
              </td>
              <td className="">
                <Skeleton count={1} width={40} />
              </td>
              <td className="text-end ">
                <Skeleton count={1} width={40} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-t-[#D9D9D9] pt-[15px] text-[#5E5D72] font-normal font-roboto text-base p-4">
        <ul className=" w-full space-y-[3px]">
          <li className="flex justify-between">
            <p>Total</p>
            <div>
              <Skeleton count={1} width={40} />
            </div>
          </li>
          <li className="flex justify-between">
            <p>Shipping</p>
            <div>
              <Skeleton count={1} width={40} />
            </div>
          </li>
          <li className="flex justify-between pb-[5px]">
            <p>Tax</p>
            <div>
              <Skeleton count={1} width={40} />
            </div>
          </li>
          <li className="flex justify-between border-t-[#D9D9D9] pt-[2.5px] border-t">
            <p className="text-[#5E5D72] font-semibold font-roboto text-base">
              Total Amount
            </p>
            <div>
              <Skeleton count={1} width={40} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="bg-white font-roboto text-base font-medium p-8 rounded-lg shadow-lg lg:rounded-none lg:shadow-none">
      <p className="text-[#05A5AC]  border-b-[#D9D9D9] border-b-[0.03125rem] pb-4">
        #{data?.order_id}{" "}
      </p>

      <div className="overflow-auto hideScroll max-h-[53vh]">
        <table className="table block">
          <thead>
            <tr className="border-b-0 text-[#5E5D72] font-roboto text-base font-semibold text-center">
              <th className="w-[300px] text-start">Product</th>
              <th className="">Quantity</th>
              <th className="text-end">Price</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.details?.items?.map((product) => (
              <tr
                key={product.id}
                className="border-b-0 text-center text-[#474747] font-roboto text-[0.875rem] "
              >
                <td className="flex w-[300px]  justify-between text-end ">
                  <img
                    className="w-[79px] h-[90px]"
                    src={imgloading ? placeholderImage : product.image}
                    loading="lazy"
                    style={{ width: "100px" }}
                    alt="tshirt"
                    onLoad={() => handleImageLoad()} // Set imageLoading to false once the image is loaded
                  />
                  <div className="flex items-center px-2">
                    {product.title}
                  </div>
                </td>
                <td className="">{product.quantity}</td>
                <td className="text-end ">{product.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-t-[#D9D9D9] pt-[15px] text-[#5E5D72] font-normal font-roboto text-base p-4">
        <ul className=" w-full space-y-[3px]">
          <li className="flex justify-between">
            <p>Total</p>
            <p className="font-semibold">{data?.details?.total_price}</p>
          </li>
          <li className="flex justify-between">
            <p>Shipping</p>
            <p className="">{data?.details?.shipping_cost}</p>
          </li>
          <li className="flex justify-between pb-[5px]">
            <p>Tax</p>
            <p>{data?.details?.tax}</p>
          </li>
          <li className="flex justify-between border-t-[#D9D9D9] pt-[2.5px] border-t">
            <p className="text-[#5E5D72] font-semibold font-roboto text-base">
              Total Amount
            </p>
            <p className="font-semibold">{data?.details?.total_payable}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
