"use client";
import { useCart } from "@/context/CartContext";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import TailwindDrawer from "../../drawerMenu/TailwindDrawer";
import CartItems from "./CartItems";
import useOutsideClick from "@/hooks/useOutsideClick";
import ApiCall from "@/lib/util/ApiCall";
import { toast } from "react-toastify";
import Sticker from "../../Sticker";

const AddToCart = ({ drawerId = "cart-drawer" }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const [noteAddedSuccess, setNoteAddedSuccess] = useState(false);
  const [noteAddedMessage, setNoteAddedMessage] = useState("");
  const hideAddCommentRef = useRef(null);
  const { performPost } = ApiCall();

  const {
    isLoading,
    cartData,
    isCartUpdate,
    fetchCartData,
    handleRemove,
    cartDetailData,
    handleQuantity,
    handleRemoveCartData,
    handleIsCartUpdate,
    openCart,
    setOpenCart,
  } = useCart();

  const getCartToken = () => {
    const cartToken = Cookies.get("cart-token");
    if (cartToken) {
      return cartToken;
    }
  };

  const gtmEvent = () => {
    if (cartData.length) {
      let items = [];
      cartData.forEach(data => {
        items.push({
          item_id: `D${data.design_id}S${data.sneaker_id}P${data.type == "T-shirts" ? 1 : 2}`,
          item_name: `${data.sneaker} ${data.design} Matching ${data.type}`,
          // discount: 2.22,
          // item_brand: data.sneaker.brand.title,
          // item_category: data.sneaker.sub_model_category.title,
          item_variant: data.product_color,
          price: data.total_price,
          item_variant: data.product_color,
          quantity: data.quantity

        })
      });

      if (window.klaviyo) {
        let items2 = [];
        let price = 0;
        let names = [];
        cartData.forEach(data => {
          names.push(`${data.sneaker} ${data.design} Matching ${data.type}`);
          price = price + parseFloat(data.total_price.replace('$', ''));
          items2.push({
            "ProductID": `D${data.design_id}S${data.sneaker_id}P${data.type == "T-shirts" ? 1 : 2}`,
            "SKU": `D${data.design_id}S${data.sneaker_id}P${data.type == "T-shirts" ? 1 : 2}`,
            "ProductName": `${data.sneaker} ${data.design} Matching ${data.type}`,
            "Quantity": data.quantity,
            "ItemPrice": data.total_price,
            "RowTotal": data.total_price,
            // "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": data.image,
            // "ProductCategories": ["Fiction", "Children"]
          })
        });

        window.klaviyo.push(["track", "Added to Cart", {
          "$value": price,
          // "AddedItemProductName": "A Tale of Two Cities",
          // "AddedItemProductID": "1112",
          // "AddedItemSKU": "TALEOFTWO",
          // "AddedItemCategories": ["Fiction", "Classics", "Children"],
          // "AddedItemImageURL": "http://www.example.com/path/to/product/image2.png",
          // "AddedItemURL": "http://www.example.com/path/to/product2",
          "AddedItemPrice": price,
          "AddedItemQuantity": items2.length,
          "ItemNames": names,
          "CheckoutURL": "https://matchmytees.com/checkout",
          "Items": items2
        }]);

        // window.kv={
        //   "$value": price,
        //   // "AddedItemProductName": "A Tale of Two Cities",
        //   // "AddedItemProductID": "1112",
        //   // "AddedItemSKU": "TALEOFTWO",
        //   // "AddedItemCategories": ["Fiction", "Classics", "Children"],
        //   // "AddedItemImageURL": "http://www.example.com/path/to/product/image2.png",
        //   // "AddedItemURL": "http://www.example.com/path/to/product2",
        //   "AddedItemPrice": price,
        //   "AddedItemQuantity": items2.length,
        //   "ItemNames": names,
        //   "CheckoutURL": "https://matchmytees.com/checkout",
        //   "Items": items2
        // };
      }
    }

  }

  useEffect(() => {
    fetchCartData();
  }, []);
  useEffect(() => {
    gtmEvent()
  }, [openCart]);

  useEffect(() => {
    if (cartDetailData.note !== "" || cartDetailData.note !== undefined) {
      setNoteAddedMessage(cartDetailData.note);
      setAddNoteText(cartDetailData.note);
    } else {
      setNoteAddedMessage("");
    }
  }, [cartDetailData.note]);

  const removeCart = async (
    cart_id,
    index,
    handleRemoveCartData,
    handleIsCartUpdate,
    token
  ) => {
    handleRemove(
      cart_id,
      index,
      handleRemoveCartData,
      handleIsCartUpdate,
      token
    );
    fetchCartData();
  };

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleCloseCart = () => {
    setOpenCart(false);
    setShowAddComment(false);
  };

  const handleAddComment = async () => {
    const data = {
      cart: getCartToken(),
      note: addNoteText,
    };
    try {
      const id = toast.loading("Please wait...");
      if (addNoteText) {
        const response = await performPost(`cart/note`, data);
        if (response.success) {
          cartDetailData.note = addNoteText;
          setNoteAddedSuccess(true);
          toast.update(id, {
            render: noteAddedMessage
              ? "Note updated successfully"
              : response.message,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          if (noteAddedSuccess) {
            setNoteAddedMessage(addNoteText);
            setAddNoteText("");
            setShowAddComment(false);
          }
          fetchCartData();
          setShowAddComment(false);
        } else {
          toast.update(id, {
            render: "Something went wrong! Please try again later.",
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.update(id, {
          render: "Please enter note",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useOutsideClick(hideAddCommentRef, () => {
    setShowAddComment(false);
  });

  return (
    <>
      <button onClick={() => setOpenCart(true)}>
        {cartIcon(cartData.length)}
      </button>
      <TailwindDrawer
        isOpen={openCart}
        setIsOpen={handleCloseCart}
        position="right"
      >
        <div className="max-h-full relative">
          <div className="flex flex-col">
            <div className="flex items-center gap-6 p-4 md:px-14">
              <img src="/images/cart.svg" alt="cart" />
              <h4 className="font-staatliches text-[28px] text-title-work-card">
                {cartData.length > 0
                  ? `Your Cart - ${cartData.length} items`
                  : "CART"}
              </h4>
            </div>
            <p className="bg-gray-secondary text-sub-work-card py-2.5 px-4 md:px-14">
              You are eligible for free shipping
            </p>
          </div>
          {cartData.length === 0 ? (
            <div className="flex flex-col items-center mt-20 gap-4 max-md:px-5 max-md:py-4 md:px-[60px]">
              <h3 className="font-staatliches text-[28px] text-title-work-card">
                YOUR CART IS EMPTY
              </h3>
              {/* <button className="font-staatliches text-lg text-title-work-card">
                Start Shopping
              </button> */}
              <Sticker />
            </div>
          ) : (
            <div className="mt-4 md:mt-11 grid grid-cols-1 min-h-screen relative">
              <div className="w-full overflow-y-auto xs:h-[calc(100vh-424px)] sm:h-[calc(100vh-300px)] pb-24">
                <CartItems
                  cartData={cartData}
                  handleQuantity={handleQuantity}
                  isCartUpdate={isCartUpdate}
                  removeCart={removeCart}
                  getCartToken={getCartToken}
                  handleRemoveCartData={handleRemoveCartData}
                  handleIsCartUpdate={handleIsCartUpdate}
                />
              </div>
              <div className="fixed bottom-0 left-0 w-full flex flex-col gap-4 md:gap-3 py-8 bg-[#EDEDED] px-5 md:px-[60px] z-10">
                <div className="flex max-md:flex-col max-md:gap-2.5 items-center justify-between text-sub-work-card text-sm font-roboto font-normal">
                  <p onClick={() => setShowAddComment(true)} className="underline cursor-pointer">
                    {noteAddedMessage ? "Edit order note" : "Add Order Note"}
                  </p>
                  <p>Shipping & taxes calculated at checkout</p>
                </div>
                <button
                  className="btn bg-orange-primary hover:bg-yellow-primary hover:text-black border-none text-white text-sm px-4 md:text-base md:font-medium md:px-[30px] xl:font-normal xl:text-[22px] xl:leading-6 xl:px-10 relative group"
                  onClick={(e) => {
                    handleCheckout();
                    setOpenCart(false);
                  }}
                >
                  <svg className="absolute left-5 stroke-white group-hover:stroke-black" width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path
                      d="M0.777779 9.88911C0.777779 9.41761 0.96508 8.96543 1.29848 8.63203C1.63188 8.29863 2.08406 8.11133 2.55556 8.11133H11.4444C11.9159 8.11133 12.3681 8.29863 12.7015 8.63203C13.0349 8.96543 13.2222 9.41761 13.2222 9.88911V15.2224C13.2222 15.6939 13.0349 16.1461 12.7015 16.4795C12.3681 16.8129 11.9159 17.0002 11.4444 17.0002H2.55556C2.08406 17.0002 1.63188 16.8129 1.29848 16.4795C0.96508 16.1461 0.777779 15.6939 0.777779 15.2224V9.88911Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.44444 8.11111V4.55556C3.44444 3.61256 3.81904 2.70819 4.48584 2.0414C5.15264 1.3746 6.05701 1 7 1C7.94299 1 8.84736 1.3746 9.51416 2.0414C10.181 2.70819 10.5556 3.61256 10.5556 4.55556V8.11111M6.11111 12.5556C6.11111 12.7913 6.20476 13.0174 6.37146 13.1841C6.53816 13.3508 6.76425 13.4444 7 13.4444C7.23575 13.4444 7.46184 13.3508 7.62854 13.1841C7.79524 13.0174 7.88889 12.7913 7.88889 12.5556C7.88889 12.3198 7.79524 12.0937 7.62854 11.927C7.46184 11.7603 7.23575 11.6667 7 11.6667C6.76425 11.6667 6.53816 11.7603 6.37146 11.927C6.20476 12.0937 6.11111 12.3198 6.11111 12.5556Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Checkout - {cartDetailData.total_price} USD</p>
                </button>
              </div>


              <div
                ref={hideAddCommentRef}
                className={`flex flex-col h-[250px] fixed bottom-0 z-10 w-full inset-x-0  gap-4 md:gap-3  bg-[#EDEDED] p-5 md:px-[60px] md:py-6 
               duration-300 transition-transform ease-in-out transform ${showAddComment ? "block" : "hidden translate-y-full"}
              `}
              >
                <textarea
                  onChange={(e) => setAddNoteText(e.target.value)}
                  placeholder={noteAddedMessage ? "Edit order note" : "Add order note"}
                  value={addNoteText ?? ""}
                  id=""
                  cols="30"
                  rows="5"
                  className="bg-transparent border border-[#474747] rounded-md focus:outline-none px-2 py-1 !font-roboto text-sub-work-card placeholder:!font-roboto placeholder:!text-sm placeholder:!text-sub-work-card placeholder:!font-normal"
                ></textarea>
                <button
                  onClick={() => handleAddComment()}
                  className="btn inline-flex !w-fit self-end items-center  bg-orange-primary hover:bg-orange-primary/80 active:bg-orange-primary/90 border-none text-white font-roboto text-[22px] font-normal py-3.5 px-[53px]"
                >
                  {noteAddedMessage ? "Update" : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>
      </TailwindDrawer>
    </>
  );
};

const cartIcon = (cartData) => {
  return (
    <div className="relative  hover:scale-[1.20] duration-200">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="md:size-4 xl:size-[25px]"
      >
        <g clipPath="url(#clip0_1026_7177)">
          <path
            d="M7.49984 18.3334C7.96007 18.3334 8.33317 17.9603 8.33317 17.5C8.33317 17.0398 7.96007 16.6667 7.49984 16.6667C7.0396 16.6667 6.6665 17.0398 6.6665 17.5C6.6665 17.9603 7.0396 18.3334 7.49984 18.3334Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6668 18.3334C17.1271 18.3334 17.5002 17.9603 17.5002 17.5C17.5002 17.0398 17.1271 16.6667 16.6668 16.6667C16.2066 16.6667 15.8335 17.0398 15.8335 17.5C15.8335 17.9603 16.2066 18.3334 16.6668 18.3334Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.833496 0.833313H4.16683L6.40016 11.9916C6.47637 12.3753 6.68509 12.7199 6.98978 12.9652C7.29448 13.2105 7.67574 13.3408 8.06683 13.3333H16.1668C16.5579 13.3408 16.9392 13.2105 17.2439 12.9652C17.5486 12.7199 17.7573 12.3753 17.8335 11.9916L19.1668 4.99998H5.00016"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1026_7177">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {cartData > 0 && (
        <span className="absolute top-2.5 -right-4 bg-sub-work-card text-white size-5 text-center rounded-md text-xs p-0.5">
          {cartData}
        </span>
      )}
    </div>
  );
};

export default AddToCart;
