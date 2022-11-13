import React from 'react';

const CommentList = ({ comments = [] }) => {
  

  return (
    <>
      <div className="">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="">
              <div className='commentAuthor'>
              <p>{comment.commentAuthor}</p>
              </div>
              <div className="commentList">
                <p>{comment.commentText}</p>
                <div>
                <span style={{ fontSize: '0.6rem' }}>
                    {comment.createdAt}
                </span>
              </div>
                
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
