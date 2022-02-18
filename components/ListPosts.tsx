import React from 'react';
import PostCard from '@/PostCard';

type ListPostsProps = {
  posts: [];
};

type ListPosts = (props: ListPostsProps) => React.ReactElement<ListPostsProps>;

/**
 * Composant pour afficher une liste de publications
 *
 * @author Roger Montero
 */
const ListPosts: ListPosts = ({ ...props }) => {
  return (
    <>
      posts:{' '}
      {props.posts.map((p, i) => (
        <PostCard key={i} example={p} />
      ))}
    </>
  );
};

export default ListPosts;
