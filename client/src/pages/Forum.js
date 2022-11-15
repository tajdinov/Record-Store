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
    <div className="container px-2 py-2">
      <Link to="/"> Home</Link>
        <div>
          <ThoughtForm />
        </div>
        <div className="">
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
