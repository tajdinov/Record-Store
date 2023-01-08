import React from "react";
import { Link } from "react-router-dom";

import CommentList from "../CommentList";

const ThoughtList = ({ thoughts }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div className="">
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="">
            <div>
              <div className="text-xl pt-4">
                <p>{thought.thoughtAuthor}</p>
              </div>

              <div className="text-sm">
                <p>{thought.thoughtText}</p>
                <div className="text-xs ">
                  <span>{thought.createdAt}</span>
                </div>
              </div>
              <div>
                <CommentList comments={thought.comments} />
              </div>
            </div>
            <div className="pt-2">
              <Link to={`/thoughts/${thought._id}`}>
                <button className="w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300 ">
                  Discuss
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
