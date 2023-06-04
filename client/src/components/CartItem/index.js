import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { TbTrashX } from "react-icons/tb";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className=" flex flex-row relative px-4 py-4">
      <div>
        <img
          className="w-[110px] h-[110px] rounded object-cover"
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div className="px-2">{item.name}</div>
        <div className="px-2">${item.price}</div>
        <div>
          <span className="px-2">Qty:</span>
          <input
            className="text-black px-2 rounded  border-2"
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />

          <TbTrashX
            onClick={() => removeFromCart(item)}
            className=" cursor-pointer px-2  text-slate-800"
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
