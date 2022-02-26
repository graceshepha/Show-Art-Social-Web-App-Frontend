import React from 'react';
import CommentSection from './CommentSection/CommentSection';
import PostInformation from './PostInformation';
import UserProfile from './UserProfile';

type SidebarProps = {
  post: Post;
};

type Sidebar = (props: SidebarProps) => React.ReactElement<SidebarProps>;

const Sidebar: Sidebar = ({ post }) => {
  return (
    <div className="flex flex-col font-sans antialiased p-2 divide-y w-full divide-slate-400/50">
      <PostInformation
        title={post.title}
        description={post.description}
        meta={post.meta}
      />
      <UserProfile user={post.owner} />
      <CommentSection id={post.id} comments={post.comments} />
    </div>
  );
};

export default Sidebar;
