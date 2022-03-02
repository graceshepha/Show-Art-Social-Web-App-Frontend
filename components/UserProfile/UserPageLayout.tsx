import React from 'react';
import { UserProfileInfos } from './UserProfileInfos';
import PostCard from '@/PostCard';
import UserStats from './UserStats';

type UserPageLayoutProps = {
  path: 'posts' | 'likes' | 'followers' | 'following';
  user: User
};
type UserPageLayout = (
  props: UserPageLayoutProps
) => React.ReactElement<UserPageLayoutProps>;

const UserPageLayout: UserPageLayout = ({ user, path }) => {
  console.log(user);

  const dynamicComponents = () => {
    switch (path) {
      case 'posts':
        return (
          user?.posts && (
            user?.posts.map((p) => <PostCard key={p.id} post={p} />)
          )
        )
      case 'likes':
        return (
          user.likedPosts ? (
            user.likedPosts.map((p) => <PostCard key={p.id} post={p} />)
          ) : <>No liked Posts</>
        )
      case 'followers':
        return (
          <>followers</>
        )
      case 'following':
        return (
          <>following</>
        )
    }
  }

  return (
    <>
      <UserProfileInfos user={user} />
      <UserStats user={user} />
      {
        dynamicComponents()
      }
    </>
  );
};

export default UserPageLayout;
