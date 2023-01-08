import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Popover, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // const { data } = useQuery(QUERY_PRODUCTS);

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_PRODUCTS,
  //       products: data.products,
  //     });
  //     data.products.forEach((product) => {
  //       idbPromise("products", "put", product);
  //     });
  //   } else if (!loading) {
  //     idbPromise("products", "get").then((products) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: products,
  //       });
  //     });
  //   }
  // }, [data, loading, dispatch]);

  // const showAll = () => {};

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className=" z-50 focus:outline-none">
      <Popover>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of the chevron icon. */
          <>
            <div className="relative px-2 pb-2 focus:outline-none">
              <Popover.Button>
                Category
                <AiFillCaretDown
                  className="absolute top-[5px] left-[70px] "
                  size={10}
                />
              </Popover.Button>
            </div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute z-10">
                <div className=" inline px-2 ">
                  <button
                    className=" w-[100px]  rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300"
                    // onClick={showAll}
                  >
                    All
                  </button>
                </div>
                {categories.map((item) => (
                  <div className=" inline px-2 ">
                    <button
                      className=" w-[100px]  rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300"
                      key={item._id}
                      onClick={() => {
                        handleClick(item._id);
                      }}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default CategoryMenu;
