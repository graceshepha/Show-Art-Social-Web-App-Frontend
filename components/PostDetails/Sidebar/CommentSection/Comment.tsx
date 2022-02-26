import React from 'react';

type CommentProps = PostComment;

type Comment = (props: CommentProps) => React.ReactElement<CommentProps>;

const Comment: Comment = ({ user, comment }) => {
  return (
    <div className="">
      <span>{user}</span> <span>{comment}</span>
    </div>
  );
};

export default Comment;
