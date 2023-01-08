import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { _id: id },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="p-4">
        <h3 className="text-xl pt-4">{thought.thoughtAuthor}</h3>
        <div className="pb-2">{thought.createdAt}</div>
        <div>
          <blockquote>{thought.thoughtText}</blockquote>
        </div>
      </div>

      <div className="">
        <CommentList comments={thought.comments} />
      </div>
      <div>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
