import React from 'react';
import { Link } from 'react-router-dom';

import CommentList from '../CommentList';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showfirstName = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>

      {thoughts &&
        thoughts.map((thought) => (
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
            <div className="my-5">
            <span style={{ fontSize: '1rem' }}>
                    {thought.createdAt}
                  </span>
              <CommentList comments={thought.comments} />
            </div>
            
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
