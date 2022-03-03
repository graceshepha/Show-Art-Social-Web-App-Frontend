import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

type CommentSectionProps = Pick<Post, 'comments'> & {
  onSendComment: (comment: string) => void;
};

type CommentSection = (
  props: CommentSectionProps
) => React.ReactElement<CommentSectionProps>;

/**
 * Composant pour la section des commentaires.
 *
 * @author Roger Montero
 */
const CommentSection: CommentSection = ({ comments, onSendComment }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert p-5 max-w-full">
      <div>Comments ({comments.length})</div>
      <NewComment onSendComment={onSendComment} />
      <div className="flex flex-col-reverse gap-2 divide-y divide-y-reverse divide-solid divide-base-content/10">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            user={comment.user}
            comment={comment.comment}
            date={comment.date}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
