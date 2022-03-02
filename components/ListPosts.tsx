import React from 'react';
import PostCard from '@/PostCard';

type ListPostsProps = {
  pages?: Post[][];
  loadMore: () => void;
};

type ListPosts = (props: ListPostsProps) => React.ReactElement<ListPostsProps>;

/**
 * Composant pour afficher une liste de publications
 *
 * @author Roger Montero
 */
const ListPosts: ListPosts = ({ pages, loadMore }) => {
  return (
    <div className="bg-base-200 rounded-xl p-5">
      <div className="relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full auto-rows-max">
        {pages?.map((page) => {
          return page.map((p) => <PostCard key={p.id} post={p} />);
        })}
      </div>
      <div className="text-center">
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
};

export default ListPosts;
