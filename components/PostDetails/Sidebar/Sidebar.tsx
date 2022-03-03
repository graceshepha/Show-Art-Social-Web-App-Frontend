import React from 'react';
import CommentSection from './CommentSection/CommentSection';
import PostInformation from './PostInformation';
import UserProfile from './UserProfile';

type SidebarProps = {
  post: Post;
  onSendComment: (comment: string) => void;
  onLikeChange: (like: boolean) => void;
};

type Sidebar = (props: SidebarProps) => React.ReactElement<SidebarProps>;

const Sidebar: Sidebar = ({ post, onSendComment, onLikeChange }) => {
  return (
    <div className="flex flex-col font-sans antialiased p-2 w-full">
      <PostInformation
        id={post.id}
        title={post.title}
        description={post.description}
        meta={post.meta}
        onLikeChange={onLikeChange}
      />
      <UserProfile user={post.owner} />
      <CommentSection comments={post.comments} onSendComment={onSendComment} />
    </div>
  );
};

export default Sidebar;
