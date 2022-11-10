import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <h2>
              Post History for {user.firstName} {user.lastName}
            </h2>
            {user.thoughts.map((thought) => (
              <div key={thought._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                  <Link
                    className="text-light"
                    to={`/thoughts/${thought._id}`}
                  >
                    {thought.thoughtAuthor} <br />
                  </Link>
              </h4>
              <div className="card-body bg-light p-2">
                <p>{thought.thoughtText}</p>
              </div>
              
              
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/thoughts/${thought._id}`}
              >
                Join the discussion.
              </Link>
            </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
