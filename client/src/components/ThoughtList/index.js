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
        <div key={thought._id} className="post">
          <div>
            <div className='thoughtAuthor'>
              <p>{thought.thoughtAuthor}</p>
            </div>

            <div className="postText">
              <p>{thought.thoughtText}</p>            
              <div>
                <span style={{ fontSize: '0.6rem' }}>
                    {thought.createdAt}
                </span>
              </div>
            </div>
            <div>
              <CommentList comments={thought.comments} />
            </div>
          </div>
            
            <Link
              className="btn btn-primary btn-block btn-squared discussion"
              to={`/thoughts/${thought._id}`}
            >
              <p className='discussion'>Join the discussion.</p>
            </Link>
        </div>
        ))}
    </div>
  );
};

export default ThoughtList;
