import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

const Forum = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="">
      <div>
        <ThoughtForm />
      </div>
      <div className=" w-full h-full p-4">
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
