import React from 'react';
import Image from 'next/image';
import { usePost } from 'data/use-post';

type PostDetailsProps = {
  id: string;
};

type PostDetails = (
  props: PostDetailsProps
) => React.ReactElement<PostDetailsProps>;

const PostDetails: PostDetails = ({ id }) => {
  const { post, loading, error, mutate } = usePost(id);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="md:flex md:flex-row">
      <div className="md:basis-4/5 md:grow md:shrink-0 relative h-200 md:h-screen md:max-w-full">
        <figure>
          <Image
            src="https://api.lorem.space/image/album?w=400&h=400"
            alt="Album"
            layout="fill"
            className="object-contain object-center"
          />
        </figure>
      </div>
      <div className="shrink bg-base-100 shadow-xl">
        <h2 className="contents">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
