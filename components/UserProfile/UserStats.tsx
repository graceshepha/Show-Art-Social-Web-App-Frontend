import React from "react";
import Link from "next/link"

type UserStatsProps = {
    user: User;
};

type UserStats = (
    props: UserStatsProps
) => React.ReactElement<UserStatsProps>;

const UserStats: UserStats = ({ user }) => (
    <>
        {user && (
            <div className="flex justify-center items-center gap-2 my-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap -mb-px">
                    <Link href={`/user/${user.username}/`} passHref>
                        <div className="mr-2 inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ">
                            <p className="text-black">{user.posts.length}</p>
                            <span className="text-gray-400">Posts</span>
                        </div>
                    </Link>
                    <Link href={`/user/${user.username}/followers`} passHref>
                        <div className="font-semibold text-center mx-4 mr-2 inline-block py-4 px-4 text-sm text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ">
                            <p className="text-black">{user.followers.length}</p>
                            <span className="text-gray-400">Followers</span>
                        </div>
                    </Link>
                    <Link href={`/user/${user.username}/following`} passHref>
                        <div className="font-semibold text-center mx-4 mr-2 inline-block py-4 px-4 text-sm text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ">
                            <p className="text-black">{user.following.length}</p>
                            <span className="text-gray-400">Following</span>
                        </div>
                    </Link>
                    <Link href={`/user/${user.username}/likes`} passHref>
                        <div className="font-semibold text-center mx-4 mr-2 inline-block py-4 px-4 text-sm text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ">
                            <p className="text-black">{user.likedPosts.length}</p>
                            <span className="text-gray-400">Likes</span>
                        </div>
                    </Link>
                </div>
            </div>
        )}
    </>
);

export default UserStats;