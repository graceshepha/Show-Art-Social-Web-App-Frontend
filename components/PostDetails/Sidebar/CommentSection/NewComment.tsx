import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { UserIcon, ChevronRightIcon } from '@heroicons/react/solid';

type NewCommentProps = {
  onSendComment: (comment: string) => void;
};

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

  const handleSend = async () => {
    if (comment.trim().length === 0 || !user) return;
    try {
      onSendComment(comment);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center my-4">
        <div className="animate-spin ease-linear border-2 rounded-full border-y-base-content border-transparent h-5 w-5" />
      </div>
    );

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

{
  /* <svg
className="stroke-stone-700 fill-stone-500"
width="4rem"
height="4rem"
viewBox="0 0 512 512"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M368,128c0,61.859-50.125,160-112,160c-61.844,0-112-98.141-112-160S160,0,256,0S368,66.141,368,128z" />
<path
  d="M416,320h-32c-23.438,0-43.75-12.75-54.875-31.563C308.063,307.625,283.313,320,256,320
c-27.281,0-52.031-12.375-73.125-31.563C171.734,307.25,151.453,320,128,320H96c0,0-58,16-96,96v64c0,17.688,14.313,32,32,32h448
c17.688,0,32-14.313,32-32v-64C474,336,416,320,416,320z"
/>
</svg> */
}
