import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

type CommentSectionProps = Pick<Post, 'id' | 'comments'>;

type CommentSection = (
  props: CommentSectionProps
) => React.ReactElement<CommentSectionProps>;

const CommentSection: CommentSection = ({ id, comments }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert p-5 max-w-full">
      <div>Comments ({comments.length})</div>
      <NewComment postId={id} />
      {comments.map(({ user, comment }, index) => (
        <Comment key={index} user={user} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
