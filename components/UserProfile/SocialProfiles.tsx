import React from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { BiLink } from 'react-icons/bi';
import { MdOutlineFacebook } from 'react-icons/md';
import { IoLogoTwitter } from 'react-icons/io';

type SocialProfileProps = Pick<UserDetails, 'socials'>;

type SocialProfile = (
  props: SocialProfileProps
) => React.ReactElement<SocialProfileProps>;

const SocialProfile: SocialProfile = ({ socials }) => (
  <>
    {socials && (
      <div className="flex flex-nowrap">
        <div>
          {socials.facebook && (
            <Link href={socials.facebook} passHref>
              <MdOutlineFacebook />
            </Link>)}
        </div>
        <div>
          {socials.twitter && (
            <Link href={socials.twitter} passHref>
              <IoLogoTwitter />
            </Link>
          )}
        </div>
        <div>
          {socials.website && (
            <Link href={socials.website} passHref>
            <BiLink />
          </Link>
          )}
        </div>
      </div>
    )}
  </>
);

export default SocialProfile;