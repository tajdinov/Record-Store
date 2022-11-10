import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Forum = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="container my-1">
      <Link to="/"> Home</Link>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>

  );
};



export default Forum;
