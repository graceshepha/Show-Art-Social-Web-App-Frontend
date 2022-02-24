import React from 'react';
import Image from 'next/image';

type UserProfileProps = {
  user: User;
};

type UserProfile = (
  props: UserProfileProps
) => React.ReactElement<UserProfileProps>;

const UserProfile: UserProfile = ({ user }) => {
  return (
    <div className="sidebar-userdetails">
      <p>username: {user.username}</p>
      <p>posts: {user.posts.length} posts</p>
    </div>
  );
};

export default UserProfile;
