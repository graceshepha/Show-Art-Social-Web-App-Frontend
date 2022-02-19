import React from 'react';
import PostCard from '@/PostCard';

type ListPostsProps = {
  pages?: PaginatedPosts[];
};

type ListPosts = (props: ListPostsProps) => React.ReactElement<ListPostsProps>;

/**
 * Composant pour afficher une liste de publications
 *
 * @author Roger Montero
 */
const ListPosts: ListPosts = ({ pages }) => {
  return (
    <div className="relative bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
      <div className="gap-2 columns-1 md:columns-3 space-y-8 w-full">
        {pages?.map((page) => {
          return page.docs.map((p) => (
            <PostCard key={p.id} example={p.title} />
          ));
        })}
      </div>
    </div>
  );
};

export default ListPosts;
