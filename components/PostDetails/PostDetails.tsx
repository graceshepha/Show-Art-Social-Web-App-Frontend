import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './PostDetails.module.css';
import { usePost } from 'data/use-post';
import Sidebar from './Sidebar/Sidebar';

type PostDetailsProps = {
  id: string;
};

type PostDetails = (
  props: PostDetailsProps
) => React.ReactElement<PostDetailsProps>;

const PostDetails: PostDetails = ({ id }) => {
  const { post, error } = usePost(id);

  if (error) return <div>Error...</div>;
  if (!post) return <div>Loading...</div>;
  return (
    <div className={styles['content-view']}>
      <div className={styles['content-image']}>
        <Image
          src={post.image}
          alt="Album"
          layout="fill"
          className="object-contain object-center"
        />
      </div>
      <div className={classNames('bg-base-100', styles['content-sidebar'])}>
        <div className="relative overflow-hidden p-2 h-full">
          <div className="overflow-y-auto scroll-smooth scroll-py-6 h-full">
            <Sidebar post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
