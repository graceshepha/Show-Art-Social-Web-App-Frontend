import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CommentProps = Pick<PostComment, 'user' | 'comment' | 'date'>;

type Comment = (props: CommentProps) => React.ReactElement<CommentProps>;

/**
 * Composant pour chaque commentaire.
 *
 * @author Roger Montero
 */
const Comment: Comment = ({ user, comment, date }) => {
  const formattedDate = () =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <article className="flex gap-3 py-2">
      <div className="avatar w-9 h-9 cursor-pointer mt-1">
        <div className="relative mask mask-square bg-opacity-10">
          <Link href={`/user/${user.username}`} passHref>
            <Image
              src={user.picture}
              alt={user.username}
              layout="fill"
              className="object-contain object-center"
            />
          </Link>
        </div>
      </div>
      <div className="w-full max-w-full">
        <div className="text-sm font-semibold mb-1">
          <Link href={`/user/${user.username}`}>{user.username}</Link>
        </div>
        <div className="break-words font-light text-sm whitespace-pre-line">
          {comment}
        </div>
        <div className="text-xs font-thin text-right select-none">
          <time dateTime={date}>{formattedDate()}</time>
        </div>
      </div>
    </article>
  );
};

export default Comment;
