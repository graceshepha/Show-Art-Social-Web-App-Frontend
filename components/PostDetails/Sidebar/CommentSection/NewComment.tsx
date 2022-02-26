import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';
import { axiosApi } from 'libs/commons';

type NewCommentProps = {
  postId: string;
};

type NewComment = (
  props: NewCommentProps
) => React.ReactElement<NewCommentProps>;

const placeholder = '/assets/images/placeholder.svg';

const NewComment: NewComment = ({ postId }) => {
  const { user, isLoading } = useUser(); // to change
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!user && !isLoading) setComment('You must be logged in to comment.');
    else setComment('');
  }, [user, postId, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = e.key;

    if (keyCode === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      setComment('');
    }
  };

  const handleSend = async () => {
    try {
      await axiosApi.post(`/api/posts/${postId}/comment`, { comment });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-2 my-2 group">
      <textarea
        name="new-comment"
        className="textarea textarea-bordered w-full h-16 resize-none text-sm rounded-sm disabled:text-opacity-25 transition-[height] delay-150 duration-300 group-hover:h-32 focus:h-32 scrollbar scrollbar-thumb-stone-900 scrollbar-track-inherit peer"
        onSubmit={handleSend}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={!user}
        rows={3}
      />
      <div className="avatar transition-[width] delay-150 duration-300 h-16 w-16 group-hover:w-0 peer-focus:w-0 order-first">
        <div className="relative mask mask-half-2 w-full h-full bg-opacity-80 bg-stone-900">
          {user ? (
            <Image
              src={user?.picture || placeholder}
              alt={user?.email || ''}
              layout="fill"
              className="object-contain object-center"
            />
          ) : (
            <svg
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
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewComment;
