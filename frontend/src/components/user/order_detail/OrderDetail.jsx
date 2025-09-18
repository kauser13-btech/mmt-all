"use client";
import ApiTokenBased from "@/lib/util/ApiTokenBased";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import ShippingAddress from "./ShippingAddress";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

const OrderDetail = () => {
  const userName = useGetCurrentUser();
  const searchParams = useSearchParams();
  const { performGet } = ApiTokenBased();
  const query = searchParams.get("order");
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchSingleDetails = async () => {
    if (query) {
      const { response } = await performGet(`my-orders?order_id=${query}&status`);
      const filterData = response.data.filter(
        (order) => order.order_id === query
      );

      setDetails(filterData[0]);
      setLoading(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchSingleDetails();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mx-auto w-full lg:my-container p-4">
      {details ?
        <>
          <ProductDetail data={details} loading={loading} />
          <div>
            <ShippingAddress data={details} loading={loading} />
            {/* <TrackingDetail data={details} loading={loading} /> */}
          </div>
        </>
        : query && <p className="font-roboto px-4 py-2 w-full text-center font-medium">Hi {userName}, You don't have any order of id {query}.</p>
      }
    </div>
  );
};

export default OrderDetail;
