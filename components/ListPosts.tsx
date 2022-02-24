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
    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
      <div className="relative gap-2 columns-1 md:columns-3 space-y-8 w-full">
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
