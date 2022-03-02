import React from 'react';
import { UserProfileInfos } from './UserProfileInfos';
import Link from 'next/link';
import PostCard from '@/PostCard';

type UserPageLayoutProps = {
  path: 'posts' | 'likes' | 'followers' | 'following' | '';
  user: User;
};

type UserPageLayout = (
  props: UserPageLayoutProps
) => React.ReactElement<UserPageLayoutProps>;

const UserPageLayout: UserPageLayout = ({ user, path }) => {

  const dynamicComponents = () => {
    switch (path) {
      case 'posts':
        return (
          <>Posts</>
        )
      case 'likes':
        return (
          <>Likes</>
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

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <Link href={`/user/${user.username}/`} passHref>
            <a className=" mr-2 inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
              Posts
            </a>
          </Link>
          <Link href={`/user/${user.username}/followers`} passHref>
            <a className=" mr-2 inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
              Followers
            </a>
          </Link>
          <Link href={`/user/${user.username}/following`} passHref>
            <a className=" mr-2 inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
              Following
            </a>
          </Link>
          <Link href={`/user/${user.username}/likes`} passHref>
            <a className=" mr-2 inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
              Likes
            </a>
          </Link>
        </ul>
      </div>
      {
        dynamicComponents()
      }
    </>
  );
};

export default UserPageLayout;
