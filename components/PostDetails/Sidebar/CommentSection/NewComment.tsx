import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { UserIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Loading from '@/Loading';

type NewCommentProps = {
  onSendComment: (comment: string) => void;
};

/**
 * Composant pour le input d'un nouveau commentaire.
 *
 * @author Roger Montero
 */
type NewComment = (
  props: NewCommentProps
) => React.ReactElement<NewCommentProps>;

const NewComment: NewComment = ({ onSendComment }) => {
  const { user, isLoading } = useUser(); // to change
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!user && !isLoading) setComment('You must be logged in to comment.');
    else setComment('');
  }, [user, isLoading]);

  if (isLoading) return <Loading />;

  /**
   * Fonction pour ajouter un commentaire au post.
   *
   * @author Roger Montero
   */
  const handleSend = async () => {
    if (comment.trim().length === 0 || !user) return;
    try {
      onSendComment(comment);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex my-2 group">
      <textarea
        name="new-comment"
        className="textarea textarea-bordered w-full h-16 resize-none text-sm rounded-none disabled:text-opacity-25 transition-height delay-150 duration-300 group-hover:h-32 focus:h-32 scrollbar scrollbar-thin scrollbar-thumb-stone-900 scrollbar-track-inherit peer"
        onSubmit={handleSend}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        disabled={!user}
        rows={3}
      />
      <div className="avatar transition-width delay-150 duration-300 h-16 w-16 group-hover:w-0 peer-focus:w-0 order-first">
        <div className="relative mask rounded-none w-full h-full bg-opacity-80 bg-stone-900">
          {user && user.picture ? (
            <Image
              src={user.picture}
              alt={user?.email || ''}
              layout="fill"
              className="object-contain object-center"
            />
          ) : (
            <UserIcon className="h-full w-full" />
          )}
        </div>
      </div>
      <div className="absolute mask mask-circle cursor-pointer bg-accent/40 hover:bg-accent-focus/60 m-1 top-0 right-0 h-5 w-5 peer-disabled:hidden peer-empty:h-0 peer-empty:opacity-0 opacity-100 transition-opacity delay-100 duration-150">
        <ChevronRightIcon className="fill-base-content" onClick={handleSend} />
      </div>
    </div>
  );
};

export default NewComment;
