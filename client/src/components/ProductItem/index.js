import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className=" relative px-4 py-4 h-[380px]">
      <Link to={`/products/${_id}`}>
        <img
          className=" w-[200px] h-[200px] "
          alt={name}
          src={`/images/${image}`}
        />
        <p className=" mt-2 w-[200px] ">{name}</p>
      </Link>
      <div>
        <div className=" mb-2">
          {quantity} {pluralize("item", quantity)} in stock
        </div>
      </div>
      <div className=" absolute bottom-1 mb-2">
        <div className=" mb-2 ">${price}</div>
        <button
          className=" w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300 "
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
