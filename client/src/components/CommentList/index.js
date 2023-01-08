import React from "react";

const CommentList = ({ comments = [] }) => {
  return (
    <>
      <div className="">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="text-xl pt-4 px-4">
              <div className="commentAuthor">
                <p>{comment.commentAuthor}</p>
              </div>
              <div className="text-sm">
                <p>{comment.commentText}</p>
                <div>
                  <span className="text-xs ">{comment.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
