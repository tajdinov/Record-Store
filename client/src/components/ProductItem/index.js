import React, { Fragment, useState } from "react";

import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity, description } = item;

  const { cart } = state;
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    alert("Added to you cart");
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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/80 bg-opacity-90"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" mx-auto max-w-l md:max-w-2xl sm:max-w-4xl text-left  transition-all transform  bg-white  rounded-2xl border-2 border-white/10 text-slate-800 ">
                  <div className=" w-full  text-slate-800">
                    <div className=" w-full h-full">
                      <div className=" ">
                        <AiOutlineCloseCircle
                          type="button"
                          className=" focus:outline-none cart absolute rounded-full border-none top-[-10px] right-[-10px] text-white bg-black cursor-pointer"
                          onClick={closeModal}
                          size={30}
                        />
                        <div className="p-4">
                          <h2>{name}</h2>

                          <p>{description}</p>
                          <div className=" mb-2 ">${price}</div>

                          <img
                            className="rounded pb-4"
                            src={`/images/${image}`}
                            alt={name}
                          />
                          {Auth.loggedIn() ? (
                            <button
                              className=" focus:outline-none w-[100px] rounded border-2 bg-white hover:bg-stone-800  text-stone-800 hover:text-white  duration-300 "
                              // onClick={addToCart}
                              onClick={() => {
                                addToCart();
                                closeModal();
                              }}
                            >
                              Add to cart
                            </button>
                          ) : (
                            <Link
                              className=" w-[100px] rounded border-2 bg-white hover:bg-stone-800  p-1  text-stone-800 hover:text-white  duration-300 "
                              to="/login"
                            >
                              Login
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" relative px-4 py-4 h-[380px] " onClick={openModal}>
        <img
          className=" w-[200px] h-[200px] cursor-pointer "
          alt={name}
          src={`/images/${image}`}
        />
        <p className=" mt-2 w-[200px] cursor-pointer">{name}</p>

        <div>
          <div className=" mb-2 cursor-pointer">
            {quantity} {pluralize("item", quantity)} in stock
          </div>
        </div>
        <div className=" absolute bottom-14 mb-2 cursor-pointer">
          <div className=" mb-2 ">${price}</div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
