import React from 'react';
import Image from 'next/image'
import SocialProfile from './SocialProfiles';

type UserProfileProps = Pick<User, 'username' | 'picture' | 'details'>;

type UserProfile = (
    props: UserProfileProps
) => React.ReactElement<UserProfileProps>;

const UserProfile: UserProfile = ({ username, picture, details }) => (
    <div className="flex flex-col gap-1 text-center">
        <div className="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg">
            <Image
                src={picture}
                alt={username}
                layout="fill"
                className="object-contain object-center"
            />
        </div>
        <p className="font-serif font-semibold">{username}</p>
        <span className="text-sm text-gray-400">{`${details?.location?.city} - ${details?.location?.country}`}</span>
        <span className="text-sm text-gray-400">{details?.bio}</span>
        <span className="text-sm text-gray-400">{details?.workplace}</span>
        <SocialProfile socials={details?.socials} />
    </div>
);