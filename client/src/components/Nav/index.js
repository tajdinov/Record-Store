import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import record from "./record-playerz.jpeg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";

import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";

import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../../utils/actions";

const stripePromise = loadStripe("pk_test_L1f0e3XAzjsG7jtp4uN7L9ql");

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
  // If so, invoke the getCart method and populate the cart with the existing from the session
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

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
                <Dialog.Panel className=" mx-auto max-w-l md:max-w-2xl sm:max-w-4xl text-left  transition-all transform dark:bg-black/80 bg-white  rounded-2xl border-2 border-white/10 text-slate-800 dark:text-white">
                  <div className=" w-full dark:text-white text-slate-800">
                    <div className=" w-full h-full">
                      <div className=" ">
                        <AiOutlineCloseCircle
                          type="button"
                          className=" focus:outline-none cart absolute rounded-full border-none top-[-10px] right-[-10px] text-white bg-black cursor-pointer"
                          onClick={closeModal}
                          size={30}
                        />

                        <h2 className=" px-2 py-2 text-2xl">Shopping Cart</h2>
                        {state.cart.length ? (
                          <div className=" py-10">
                            {state.cart.map((item) => (
                              <CartItem key={item._id} item={item} />
                            ))}

                            <div className=" flex flex-row space-between">
                              <p className="px-4">Total: ${calculateTotal()}</p>

                              {Auth.loggedIn() ? (
                                <button
                                  className="w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300"
                                  onClick={submitCheckout}
                                >
                                  Checkout
                                </button>
                              ) : (
                                <span>(log in to check out)</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <h3 className="px-8 py-4 text-2xl"> is empty</h3>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" w-full h-4 md:h-[80px] flex justify-between  items-center px-4 text-white z-20">
        <div className="hidden md:flex">
          <div className="group">
            <Link to="/">
              <img
                src={record}
                alt="Avatar"
                width={80}
                className=" px-2 py-2 rounded-full group "
              />

              <BiHome
                size={65}
                className="dark:text-white text-black/80 absolute border-none top-[7.5px] left-[23.5px] opacity-0 group-hover:opacity-100 rounded-full bg-white dark:bg-black/90 duration-500"
              />
            </Link>
          </div>

          {Auth.loggedIn() ? (
            <div className="flex flex-wrap pt-[25px]">
              <Link
                to="/gallery"
                className="  mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500 "
              >
                Gallery
              </Link>

              <Link
                className="  mx-6 text-lg text-black dark:text-white  hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500 "
                to="/forum"
              >
                Forum
              </Link>

              <Link
                className="  mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500 "
                to="/orderHistory"
              >
                History
              </Link>
              <p
                onClick={openModal}
                className="mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500 cursor-pointer"
              >
                Cart
              </p>

              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a
                className="mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500"
                href="/"
                onClick={() => Auth.logout()}
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="flex flex-wrap pt-[25px]">
              <Link
                className="  mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500 "
                to="/signup"
              >
                Signup
              </Link>

              <Link
                className="mx-6 text-lg text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-xl duration-500"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger */}
      <div
        onClick={handleClick}
        className="md:hidden fixed top-4 right-4 z-50 cursor-pointer"
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      <div>
        {/* Mobile menu */}
        <ul
          className={
            !nav
              ? "hidden"
              : "fixed bg-white dark:bg-black/90 top-0 left-0 w-full h-full text-white flex flex-col justify-center items-center z-10"
          }
        >
          {Auth.loggedIn() ? (
            <>
              <li>
                <img
                  src={record}
                  alt="Avatar"
                  width={80}
                  className="rounded-full group "
                />
              </li>
              <li>
                <Link to="/">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 "
                    onClick={handleClick}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 "
                    onClick={handleClick}
                  >
                    Gallery
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/forum">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white  hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 "
                    onClick={handleClick}
                  >
                    Forum
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/orderHistory">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 "
                    onClick={handleClick}
                  >
                    History
                  </p>
                </Link>
              </li>
              <li>
                <p
                  onClick={openModal}
                  className="py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 cursor-pointer"
                >
                  Cart
                </p>
              </li>

              <li>
                <p
                  className="py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 cursor-pointer"
                  href="/"
                  onClick={() => Auth.logout()}
                >
                  Logout
                </p>
              </li>
            </>
          ) : (
            <>
              <li>
                <img
                  src={record}
                  alt="Avatar"
                  width={80}
                  className="rounded-full group "
                />
              </li>
              <li>
                <Link to="/">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 "
                    onClick={handleClick}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <p
                    className="  py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl duration-500 cursor-pointer"
                    onClick={handleClick}
                  >
                    Signup
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <p
                    className="py-6 text-4xl text-black dark:text-white hover:text-sky-700 dark:hover:text-sky-200 hover:text-5xl  duration-500 cursor-pointer"
                    onClick={handleClick}
                  >
                    Login
                  </p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Nav;
