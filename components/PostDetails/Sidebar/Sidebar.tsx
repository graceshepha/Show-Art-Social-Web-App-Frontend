import React from 'react';
import CommentSection from './CommentSection/CommentSection';
import PostInformation from './PostInformation';
import UserProfile from './UserProfile';

type SidebarProps = {
  post: Post;
  onSendComment: (comment: string) => void;
};

type Sidebar = (props: SidebarProps) => React.ReactElement<SidebarProps>;

const Sidebar: Sidebar = ({ post, onSendComment }) => {
  return (
    <div className="flex flex-col font-sans antialiased p-2 w-full">
      <PostInformation
        title={post.title}
        description={post.description}
        meta={post.meta}
      />
      <UserProfile user={post.owner} />
      <CommentSection comments={post.comments} onSendComment={onSendComment} />
    </div>
  );
};

export default Sidebar;
