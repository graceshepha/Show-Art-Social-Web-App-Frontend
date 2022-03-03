import React from 'react';
import Image from 'next/image';
import SocialProfile from './SocialProfiles';

type UserProfileProps = {
  user: User;
};

type UserProfileInfos = (
  props: UserProfileProps
) => React.ReactElement<UserProfileProps>;

/**
 * Composant pour afficher les informations de l'utilisateur dans la page de profile.
 *
 * @author Bly Grâce Schephatia
 */
export const UserProfileInfos: UserProfileInfos = ({ user }) => {
  return (
    <div className="flex flex-col gap-1 text-center">
      <div className="relative block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg">
        <Image
          src={user.picture}
          alt={user.username}
          layout="fill"
          className="object-contain object-center"
        />
      </div>
      <p className="font-serif font-semibold">{user.username}</p>
      <div className="min-h-5">
        {user.details?.location && (
          <span className="text-sm text-gray-400">{`${user.details?.location?.city} - ${user.details?.location?.country}`}</span>
        )}
      </div>
      {user.details && (
        <>
          <span className="text-sm text-gray-400">{user.details?.bio}</span>
          <span className="text-sm text-gray-400">
            {user.details?.workplace}
          </span>
        </>
      )}
      <SocialProfile user={user} />
    </div>
  );
};
