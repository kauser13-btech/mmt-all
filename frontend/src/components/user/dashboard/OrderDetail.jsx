"use client";
import ApiTokenBased from "@/lib/util/ApiTokenBased";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
// ... (existing imports)

const OrderDetail = () => {
  const { performGet } = ApiTokenBased();
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imgloading, setImgLoading] = useState(true);
  const placeholderImage = "/images/placeholder.jpg";
  let [item, setItem] = useState("items");
  const fetchOrderData = async () => {
    const { response, error } = await performGet(`my-orders?order_id&status`);
    if (response.success) {
      setLoading(false);
      if (response.data.length > 0) {
        if (response.data[0].details.items.length <= 1) {
          setItem("item");
        }
        setOrderData(response.data[0]);
      } else {
        setOrderData([]);
      }
    } else {
      return error;
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [currentPage]);

  const handleImageLoad = () => {
    setImgLoading(false);
  };
  return (
    loading ? (
      <div className="flex flex-col space-y-[10px] md:flex-row justify-start items-center max-w-[1250px] m-auto py-6 ">
        <div className="flex justify-evenly items-center flex-col lg:flex-row grow lg:ml-[-90px]">
          <p className="text-base font-medium text-start text-sub-work-card px-3">
            <Skeleton count={1} width={200} /> </p>
          <div className="w-[79px] ">

            <Skeleton width={79} height={90} count={1} />

          </div>
          <div className=" flex flex-col items-center lg:flex-row justify-evenly ">
            <div className="px-3 max-w-[300px] ">
              <p className="text-center lg:text-start font-roboto font-semibold lg:font-normal text-base text-[#474747]">
                <Skeleton count={3} width={160} />
              </p>
            </div>
            <div className="flex flex-row lg:max-w-[300px] xl:space-x-[30px]">
              <p className="text-base text-sub-work-card text-center"><Skeleton count={1} width={40} /></p>
              <p className="font-medium text-black px-3"><Skeleton count={1} width={40} /></p>
            </div>
            <div className="px-3 w-[150px] text-center">
              <Skeleton count={1} />
            </div>
          </div>
        </div>

      </div>

    ) : (
      <div className="flex flex-col space-y-[10px] md:flex-row justify-start items-center max-w-[1250px] m-auto py-6 ">
        {orderData.length ? (
          <div className="flex justify-evenly items-center flex-col lg:flex-row grow">
            <p className="text-base font-medium text-start text-sub-work-card px-3">{orderData?.order_id}</p>
            <div className="w-[79px] ">

              {orderData?.details?.items.length > 0 && <img
                className="w-[79px] h-[90px]"
                src={imgloading ? placeholderImage : orderData?.details?.items[0].image}
                alt=""
                loading="lazy"
                onLoad={() => handleImageLoad()} // Set imageLoading to false once the image is loaded
              />}

            </div>
            <div className=" flex flex-col items-center lg:flex-row justify-evenly ">
              <div className="px-3 max-w-[300px] ">
                {orderData?.details?.items.length > 0 ? (
                  <p className="text-center lg:text-start font-roboto font-semibold lg:font-normal text-base text-[#474747]">
                    {orderData?.details?.items[0].product_name}
                  </p>
                ) : (
                  <p>No item title found</p>
                )}
              </div>
              <div className="flex flex-row lg:max-w-[300px] xl:space-x-[30px]">
                <p className="text-base text-sub-work-card text-center">{orderData?.details?.items.length} {item}</p>
                <p className="font-medium text-black px-3">{orderData?.details?.total_payable}</p>
              </div>
              <div className="px-3 w-[150px] text-center">
                <Link href={`/user/orderdetail?order=${orderData.order_id}`}>
                  <p className="text-[#05a5ac] font-normal text-base break-normal">See Details &gt;</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="font-roboto px-4 py-2 w-full text-center font-medium">You have no orders yet. Browse our site and place an order now for your trendiest design. Enjoy shopping and elevate your style game today!</div>
        )}
      </div>
    )
  );
};

export default OrderDetail;
