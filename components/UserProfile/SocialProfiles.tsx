import React from "react";
import Link from "next/link";
import { BiLink } from 'react-icons/bi';
import { MdOutlineFacebook } from 'react-icons/md';
import { IoLogoTwitter } from 'react-icons/io';

type SocialProfileProps = {
  user: User;
};

type SocialProfile = (
  props: SocialProfileProps
) => React.ReactElement<SocialProfileProps>;

const SocialProfile: SocialProfile = ({ user }) => (
  <>
    {user.details?.socials && (
      <div className="flex flex-nowrap">
        <div>
          {user.details.socials.facebook && (
            <Link href={user.details.socials.facebook} passHref>
              <MdOutlineFacebook />
            </Link>)}
        </div>
        <div>
          {user.details.socials.twitter && (
            <Link href={user.details.socials.twitter} passHref>
              <IoLogoTwitter />
            </Link>
          )}
        </div>
        <div>
          {user.details.socials.website && (
            <Link href={user.details.socials.website} passHref>
            <BiLink />
          </Link>
          )}
        </div>
      </div>
    )}
  </>
);

export default SocialProfile;