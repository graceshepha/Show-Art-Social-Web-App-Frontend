import React from 'react';
import Image from 'next/image';

type UserProfileProps = {
  user: User;
};

type UserProfile = (
  props: UserProfileProps
) => React.ReactElement<UserProfileProps>;

/**
 * Composant pour afficher les informations du user qui a publié le post.
 *
 * @author Roger Montero
 */
const UserProfile: UserProfile = ({ user }) => (
  <div className="sidebar-userdetails p-5 prose prose-zinc dark:prose-invert max-w-full">
    <div className="relative flex gap-3 place-items-start content-start">
      <div className="avatar">
        <div className="relative mask mask-square h-24 w-24 bg-opacity-10">
          <Image
            src={user.picture}
            alt={user.username}
            layout="fill"
            className="object-contain object-center"
          />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold mt-0 mb-3">{user.username}</p>
        <p className="font-light mt-2">
          {user.details?.bio ? user.details.bio : 'bio... '}
        </p>
      </div>
    </div>
  </div>
);

export default UserProfile;
