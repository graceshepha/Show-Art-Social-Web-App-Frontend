import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

const NavBaritemProfile = () => {
  const { user } = useUser();
  return (
    <div className="dropdown dropdown-end">
      <Image
        tabIndex={0}
        className="inline-block h-12 w-12 rounded-full btn"
        src={`${user?.picture}`}
        alt=""
        width={48}
        height={48}
      />
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content bg-neutral rounded w-52"
      >
        <div className="py-3 px-4">
          <span className="block text-lg text-white font-bold dark:text-white">
            {user?.nickname}
          </span>
          <span className="block text-base font-medium text-white truncate dark:text-gray-400">
            {user?.email}
          </span>
        </div>
        <div className="divider"></div>
        <li className="text-white">
          <a>Your profile</a>
        </li>
        <li className="text-white">
          <Link href="/api/auth/logout">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBaritemProfile;
