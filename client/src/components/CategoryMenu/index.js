import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Popover } from "@headlessui/react";
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
            <div className="relative px-2 focus:outline-none">
              <Popover.Button>
                Category
                <AiFillCaretDown
                  className="absolute top-[5px] left-[70px] "
                  size={10}
                />
              </Popover.Button>
            </div>
            <Popover.Panel className="absolute z-10">
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

              <img src="/solutions.jpg" alt="" />
            </Popover.Panel>
          </>
        )}
      </Popover>
      {/* <Popover className="relative">
        <Popover.Button>Choose a Category:</Popover.Button>

        <Popover.Panel className="absolute z-10">
          {categories.map((item) => (
            <div className=" inline px-2 ">
              <button
                className=" w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300"
                key={item._id}
                onClick={() => {
                  handleClick(item._id);
                }}
              >
                {item.name}
              </button>
            </div>
          ))}

          <img src="/solutions.jpg" alt="" />
        </Popover.Panel>
      </Popover> */}
      {/* <h4 className="py-8 px-2">Choose a Category:</h4>
      {categories.map((item) => (
        <div className=" inline px-2 ">
          <button
            className=" w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300"
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        </div>
      ))} */}
    </div>
  );
}

export default CategoryMenu;
