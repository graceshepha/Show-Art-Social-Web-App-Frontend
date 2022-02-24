import React from 'react';
import PostInformation from './PostInformation';
import UserProfile from './UserProfile';

type SidebarProps = {
  post: Post;
};

type Sidebar = (props: SidebarProps) => React.ReactElement<SidebarProps>;

const Sidebar: Sidebar = ({ post }) => {
  return (
    <div className="flex flex-col font-sans antialiased">
      <PostInformation
        title={post.title}
        description={post.description}
        meta={post.meta}
      />
      <UserProfile user={post.owner} />
      <div>{post.comments}</div>
    </div>
  );
};

export default Sidebar;
