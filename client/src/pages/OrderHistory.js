import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../utils/mutations';
import { QUERY_THOUGHTS } from '../utils/queries';

function OrderHistory() {
  console.log('req');
  const { data, loading  } = useQuery(QUERY_USER);

  console.log({data})
  const [user, setUser] = useState({user:{}, orders:[], thoughts:[]});

  useEffect(() => {
    console.log('eff')
    console.log({loading, data})
    if (data) {
    console.log({data});
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
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {loading ? 'Loading...' : (data &&
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
                  {order.products.length && order.products.map(({ _id, image, name, price }, index) => (
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
              Post History for {user.firstName}
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
                <a href="/" >Remove</a>
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
        )}
      </div>
    </>
  );
}

export default OrderHistory;