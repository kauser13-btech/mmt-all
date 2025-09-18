import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Make sure to import the 'js-cookie' library
import ApiCall from "@/lib/util/ApiCall";
import ApiTokenBased from "@/lib/util/ApiTokenBased";

const useFetchCartData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [cartDetailData, setCartDetailData] = useState([]);
  const [isCartUpdate, setIsCartUpdate] = useState([]);
  const { performGet, performPost } = ApiCall();
  const { performGet: performGetToken, performPost: performPostToken } =
    ApiTokenBased();
  const handleRemoveCartData = (id) => {
    setCartData((prevData) => prevData.filter((cart) => cart.id !== id));
  };
  const handleIsCartUpdate = (index, bool) => {
    setIsCartUpdate((prevData) =>
      prevData.map((value, i) => (i === index ? bool : value))
    );
  };
  const handlePushToCartUpdate = (response, index) => {
    setCartData((prevData) =>
      prevData.map((cart) =>
        cart.id === response.data.items[index].id
          ? response.data.items[index]
          : cart
      )
    );
  };

  const fetchCartData = async () => {
    setIsLoading(true);
    const cartToken = Cookies.get("cart-token");
    const userSession = Cookies.get("mmt_user_session");
    if (cartToken) {
      try {
        let response;
        if (userSession) {
          const { response: res } = await performGetToken(
            `cart?cart=${cartToken}`
          );
          response = res;
        } else {
          response = await performGet(`cart?cart=${cartToken}`);
        }
        if (response.success) {
          if (response.cart_change) {
            Cookies.set("cart-token", response.data.uid);
          } else {
            setCartDetailData(response.data);
            setCartData(response.data.items);
            setIsCartUpdate(Array(response.data.items.length).fill(false));
          }
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuantity = async (
    index,
    id,
    color,
    design,
    size,
    sneaker,
    quantity,
    title,
    product_type,
    cart,
    type
  ) => {
    let updateCartData;
    if (type == "decrement") {
      updateCartData = {
        id: id,
        color: color,
        design: design,
        size: size,
        sneaker: sneaker,
        quantity: quantity > 1 ? quantity - 1 : quantity,
        title: title,
        product_type: product_type,
        cart: cart,
      };
    } else if (type === "increment") {
      updateCartData = {
        id: id,
        color: color,
        design: design,
        size: size,
        sneaker: sneaker,
        quantity: quantity + 1,
        title: title,
        product_type: product_type,
        cart: cart,
      };
    }

    handleIsCartUpdate(index, true);

    const response = await performPost("cart", updateCartData);
    if (response.success) {
      handlePushToCartUpdate(response, index);
      fetchCartData();
    }
    handleIsCartUpdate(index, false);
  };

  return {
    isLoading,
    cartData,
    cartDetailData,
    isCartUpdate,
    fetchCartData,
    handleRemoveCartData,
    handleQuantity,
    handleIsCartUpdate,
    handleRemoveCartData,
  };
};

export default useFetchCartData;
