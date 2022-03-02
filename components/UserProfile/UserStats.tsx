import React from "react";

type UserStatsProps = {
    user: User;
};

type UserStats = (
    props: UserStatsProps
) => React.ReactElement<UserStatsProps>;

const UserStats: UserStats = ({ user }) => (
    <>
        {user && (
            <div className="flex justify-center items-center gap-2 my-3">
                <div className="font-semibold text-center mx-4">
                    <p className="text-black">{user.posts.length}</p>
                    <span className="text-gray-400">Posts</span>
                </div>
                <div className="font-semibold text-center mx-4">
                    <p className="text-black">{user.followers.length}</p>
                    <span className="text-gray-400">Followers</span>
                </div>
                <div className="font-semibold text-center mx-4">
                    <p className="text-black">{user.following.length}</p>
                    <span className="text-gray-400">Folowing</span>
                </div>
                <div className="font-semibold text-center mx-4">
                    <p className="text-black">{user.likedPosts.length}</p>
                    <span className="text-gray-400">Likes</span>
                </div>
            </div>
        )}
    </>
);

export default UserStats;