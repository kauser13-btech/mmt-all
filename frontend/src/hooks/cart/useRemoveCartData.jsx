import ApiCall from "@/lib/util/ApiCall";
import React from "react";

const useRemoveCartData = () => {
  const { performPost } = ApiCall();
  const handleRemove = async (
    id,
    index,
    handleRemoveCartData,
    handleIsCartUpdate,
    getCartToken
  ) => {
    const deleteData = {
      cart: getCartToken,
      id: id,
    };

    handleIsCartUpdate(index, true);
    const response = await performPost("cart/remove", deleteData);
    if (response.success) {
      handleRemoveCartData(id);
      handleIsCartUpdate(index, false);
    }
  };

  return { handleRemove };
};

export default useRemoveCartData;
