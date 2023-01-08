import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_THOUGHT } from "../utils/mutations";
import { QUERY_THOUGHTS } from "../utils/queries";

function OrderHistory() {
  console.log("req");
  const { data, loading } = useQuery(QUERY_USER);

  console.log({ data });
  const [user, setUser] = useState({ user: {}, orders: [], thoughts: [] });

  useEffect(() => {
    console.log("eff");
    console.log({ loading, data });
    if (data) {
      console.log({ data });
      setUser(data.user);
      // user = data.user;
      // console.log(user);
    }
  }, [data, loading]);

  const [removeThought, { error }] = useMutation(REMOVE_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [removeThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      // });
    },
  });

  return (
    <>
      <div className=" px-4 py-4">
        {loading
          ? "Loading..."
          : data && (
              <>
                <h2 className=" text-2xl">
                  Order History for {user.firstName} {user.lastName}
                </h2>
                {user.orders.map((order) => (
                  <div key={order._id} className="my-2">
                    <h3 className="text-xl">
                      {new Date(
                        parseInt(order.purchaseDate)
                      ).toLocaleDateString()}
                    </h3>
                    <div className="flex flex-row">
                      {order.products.length &&
                        order.products.map(
                          ({ _id, image, name, price }, index) => (
                            <div key={index} className="pr-2 py-2">
                              <img alt={name} src={`/images/${image}`} />
                              <p>{name}</p>

                              <div>
                                <span>${price}</span>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))}
                <h2 className=" text-2xl pt-8">
                  Post History for {user.firstName} {user.lastName}
                </h2>
                {user.thoughts.map((thought) => (
                  <div key={thought._id} className="">
                    <h4 className="card-header bg-primary text-light p-2 m-0">
                      <Link
                        className="text-light"
                        to={`/thoughts/${thought._id}`}
                      >
                        {thought.thoughtAuthor} <br />
                      </Link>
                    </h4>
                    <div className="">
                      <span className=" text-xl">{thought.createdAt}</span>
                      <p>{thought.thoughtText}</p>
                      {/* <a href="/">Remove</a> */}
                    </div>
                    <div className="py-4">
                      <Link
                        className=" w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300 "
                        to={`/thoughts/${thought._id}`}
                      >
                        Join the discussion.
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
      </div>
    </>
  );
}

export default OrderHistory;
