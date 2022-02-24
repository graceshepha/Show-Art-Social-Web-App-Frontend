import React from 'react';
import UserProfile from './UserProfile';

type SidebarProps = {
  post: Post;
};

type Sidebar = (props: SidebarProps) => React.ReactElement<SidebarProps>;

const Sidebar: Sidebar = ({ post }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert flex flex-col">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <UserProfile user={post.owner} />
      <div>{post.comments}</div>
    </div>
  );
};

export default Sidebar;
