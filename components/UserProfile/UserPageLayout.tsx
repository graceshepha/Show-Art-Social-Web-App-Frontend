import React from 'react';
import { UserProfileInfos } from './UserProfileInfos';
import PostCard from '@/PostCard';
import UserStats from './UserStats';
import UserLists from './UserLists';

type UserPageLayoutProps = {
  path: 'posts' | 'likes' | 'followers' | 'following';
  user: User;
};
type UserPageLayout = (
  props: UserPageLayoutProps
) => React.ReactElement<UserPageLayoutProps>;

/**
 * Layout pour la page d'un utilisateur
 *
 * @author Bly Grâce Schephatia
 */
const UserPageLayout: UserPageLayout = ({ user, path }) => {
  const dynamicComponents = () => {
    switch (path) {
      case 'posts':
        return (
          <div className="bg-base-200 rounded-xl p-5">
            <div className="relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full auto-rows-max">
              {user?.posts &&
                user?.posts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        );
      case 'likes':
        return (
          <div className="bg-base-200 rounded-xl p-5">
            <div className="relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full auto-rows-max">
              {user.likedPosts ? (
                user.likedPosts.map((p) => <PostCard key={p.id} post={p} />)
              ) : (
                <> No liked Posts </>
              )}
            </div>
          </div>
        );
      case 'followers':
        return (
          <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide-y w-full">
              {user.followers ? (
                user.followers.map((user) => (
                  <UserLists key={user.id} user={user} />
                ))
              ) : (
                <> No Followers</>
              )}
            </ul>
          </div>
        );
      case 'following':
        return <>following</>;
    }
  };

  return (
    <div className="p-5">
      <UserProfileInfos user={user} />
      <UserStats user={user} />
      {dynamicComponents()}
    </div>
  );
};

export default UserPageLayout;
