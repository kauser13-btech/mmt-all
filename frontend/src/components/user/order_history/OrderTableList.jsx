"use client";
import { useRef } from "react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApiCall from "@/lib/util/ApiCall";
import ApiTokenBased from "@/lib/util/ApiTokenBased";
import Skeleton from "react-loading-skeleton";
const OrderTableList = () => {
  const { performGet } = ApiTokenBased();

  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);
  const fetchOrderData = async () => {
    const { response, error } = await performGet(`my-orders?order_id&status&limit=6&page=${currentPage}`);
    if (response.success) {
      setLoading(false);
      setOrderData((prevData) => [...prevData, ...response.data]);
      setLastPage(response.pagination.last_page);
      setPagination(response.pagination);
    }
  };
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment by 1
    setLoading(true);
  };
  const loadPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage is never less than 1
    setLoading(true);
  };
  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // } else {
    setOrderData([]);
    fetchOrderData();
    // }
  }, [currentPage]);

  console.log(orderData.length);
  return (
    <div className="m-auto bg-white flex flex-col items-center sm:block sm:px-[40px] pb-[23px] sm:pt-[23px] space-y-[10px] my-container">
      <p className="max-w-[1330px]  overflow-x-auto text-base font-semibold text-[#5e5d72] mb-[25px] pt-[23px] ">Order History</p>
      <div className="pb-[23px] overflow-auto bg-white my-container lg:max-w-full md:hideScroll rounded-lg shadow-sm lg:shadow-none p-4 max-h-[600px] ">
        <table className="text-left w-full min-w-[600px]">
          <thead>
            <tr className="text-[#5e5d72] border-b border-b-[#b1b5b8]">
              <th>Order Number</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td><Skeleton count={6} className="my-5" /></td><td><Skeleton count={6} className="my-5" /></td><td><Skeleton count={6} className="my-5" /></td><td><Skeleton count={6} className="my-5" /></td><td><Skeleton count={6} className="my-5" /></td></tr>
            ) : (
              orderData.length === 0 ? <tr><td colSpan="5" className="text-center p-10">No data available</td></tr> :
                orderData.map((order) => (
                  <tr key={order.order_id}>
                    <td className="text-[#b1b5b8] py-5">{order.order_id}</td>

                    <td>
                      {/* Calculate total quantity for each order */}
                      {order.details.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </td>

                    <td>{order.details.total_price}</td>

                    <td>
                      {/* Use the following class depending on the status for the span
                    shipped, pending, received, canceled */}
                      <span className="py-[6px] px-[12px] text-white font-roboto  text-xs rounded-[4px] bg-[#05a5ac]">
                        {/* {order.status} */}
                        Pending
                      </span>
                    </td>

                    <td>
                      <Link
                        href={`/user/orderdetail?order=${order.order_id}`}
                        id={order.order_id}
                        className="text-[#05a5ac] hover:text-[#058990]"
                      >
                        View
                      </Link>
                    </td>

                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end space-x-[30px] pr-[30px]">
        <button
          className="btn btn-active designYourOwnBackground disabled:hidden sm:btn-sm md:btn-md text-white font-thin"
          onClick={loadPrevious}
          disabled={currentPage === 1} // Disable the button when currentPage equals lastPage
        >
          {currentPage === lastPage ? 'No More Data' : 'Previous Page'}
        </button>
        <button
          className="btn btn-active designYourOwnBackground disabled:hidden sm:btn-sm md:btn-md text-white font-thin"
          onClick={loadMore}
          disabled={currentPage === lastPage} // Disable the button when currentPage equals lastPage
        >
          {currentPage === lastPage ? 'No More Data' : 'Next Page'}
        </button>
      </div>
    </div>
  );
};

export default OrderTableList;
