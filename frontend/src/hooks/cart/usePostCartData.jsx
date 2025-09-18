import ApiCall from "@/lib/util/ApiCall";
import Cookies from "js-cookie";
import React, { useState } from "react";

const usePostCartData = () => {
  const { performGet, performPost } = ApiCall();
  const [loading, setLoading] = useState(false);
  const handleToCart = async (
    quantity,
    data,
    filterColor,
    queryParams,
    size
  ) => {
    setLoading(true);
    let cartToken = Cookies.get("cart-token");
    if (!cartToken) {
      const response = await performGet("cart");
      if (response.status === 200) {
        Cookies.set("cart-token", response.data.uid);
        cartToken = Cookies.get("cart-token");
      }
    }
    const cartData = {
      quantity: quantity,
      sneaker: data.sneaker.slug,
      size: size,
      color: data.color,
      cart: cartToken,
      product_type: queryParams.type,
      title: data.title,
      design: queryParams.design,
    };
    const response = await performPost("cart", cartData);

    setLoading(false);
  };
  return { loading, handleToCart };
};

export default usePostCartData;
