import Sticker from "../../Sticker";
import TailwindLoader from "../../TailwindLoader";

const CartItems = ({
  cartData,
  isCartUpdate,
  handleQuantity,
  removeCart,
  getCartToken,
  handleRemoveCartData,
  handleIsCartUpdate,
  type,
  padding = "max-md:px-5 max-md:py-4 md:px-[60px]",
}) => {
  return (
    <>
      {cartData.map((cart, index) => (
        <div className={`flex gap-1.5 md:gap-10 ${padding}`} key={cart.id}>
          {!cart.image ? (
            <TailwindLoader height={"!w-[50px] h-[50px]"} />
          ) : (
            <div className="mt-1">
              <div className="min-w-12 max-w-12 min-h-12 max-h-12 md:p-1.5 md:min-w-[66px] md:min-h-[66px] md:max-w-[66px] md:max-h-[66px] bg-white shadow-lg flex items-center justify-center">
                {!isCartUpdate[index] ? (
                  <img
                    className="w-auto h-full"
                    src={cart.image}
                    alt={cart.title}
                  />
                ) : (
                  <div className="relative flex items-center justify-center">
                    <img
                      className="w-auto h-full opacity-50"
                      src={cart.image}
                      alt={cart.title}
                    />
                    <span className="loading loading-spinner text-warning absolute"></span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full text-sub-work-card text-base gap-5 md:gap-0">
            <div className="flex justify-between w-full gap-[18px]">
              <p className="font-roboto font-medium max-sm:text-xs text-base w-full">
                {cart.title}
              </p>
              <div className="flex flex-col gap-2.5 min-w-fit">
                <h3 className="text-orange-primary text-2xl font-roboto font-semibold self-end">
                  {cart.total_price}
                </h3>
                {(59.99 - parseFloat(cart.total_price.replace(/[^\d.]/g, ''))) > 0 && (
                  <p className="self-end text-sm font-normal text-sub-work-card line-through">
                    $59.99
                  </p>
                )}
              </div>
            </div>
            <div className="flex max-md:min-w-full md:flex-col max-md:gap-6 md:gap-4">
              <div className="text-base flex flex-col md:gap-0 w-full">
                <p>Size: {cart.product_variant_size}</p>
                <p>Color: {cart.product_color}</p>
              </div>
              {type !== "checkout" && (
                <div className="flex max-md:flex-col max-md:justify-between items-start md:items-center max-md:w-full gap-4 md:gap-6">
                  <div className="flex items-center gap-2 max-md:self-end border rounded-md border-[#B1B5B8]">
                    {cart.quantity > 1 ? (
                      <span
                        className="cursor-pointer px-5 py-2"
                        onClick={() =>
                          handleQuantity(
                            index,
                            cart.id,
                            cart.product_color,
                            cart.design,
                            cart.product_variant_size,
                            cart.sneaker,
                            cart.quantity,
                            cart.title,
                            cart.type,
                            getCartToken(),
                            "decrement"
                          )
                        }
                      >
                        -
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer px-5 py-2"
                        onClick={() =>
                          removeCart(
                            cart.id,
                            index,
                            handleRemoveCartData,
                            handleIsCartUpdate,
                            getCartToken()
                          )
                        }
                      >
                        -
                      </span>
                    )}
                    <span className="font-montserrat text-base font-medium tracking-[-0.48px]">
                      {cart.quantity}
                    </span>
                    <span
                      className="cursor-pointer px-5 py-2"
                      onClick={() =>
                        handleQuantity(
                          index,
                          cart.id,
                          cart.product_color,
                          cart.design,
                          cart.product_variant_size,
                          cart.sneaker,
                          cart.quantity,
                          cart.title,
                          cart.type,
                          getCartToken(),
                          "increment"
                        )
                      }
                    >
                      +
                    </span>
                  </div>
                  <p
                    onClick={() =>
                      removeCart(
                        cart.id,
                        index,
                        handleRemoveCartData,
                        handleIsCartUpdate,
                        getCartToken()
                      )
                    }
                    className="hover:underline font-roboto font-normal text-center text-base max-md:self-end cursor-pointer"
                  >
                    Remove
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <Sticker extraClass="px-10 py-1" isCheckout={true} />
    </>
  );
};

export default CartItems;