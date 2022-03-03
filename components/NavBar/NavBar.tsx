/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import ActiveLink from '@/NavBar/ActiveLink';
import NavBaritemProfile from '@/NavBar/NavBarItemProfile';
import { BsFillPlusSquareFill } from 'react-icons/bs';

type navItem = {
  name: string;
  href: string;
};

/**
 * Une liste d'élément à montrer dans la barre de navigation.
 */
const navigation: navItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
];

/**
 * Composant pour la barre de navigation.
 *
 * @author Bly Grâce Schephatia
 */
export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="navbar shadow-lg bg-neutral text-neutral-content">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">showArts</span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          {navigation.map((item) => (
            <ActiveLink
              activeClassName="active"
              key={item.href}
              href={item.href}
            >
              <a className="btn btn-ghost btn-lg rounded-btn text-gray-400">
                {item.name}
              </a>
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="flex navbar-end mx-5">
        <div className="flex-1 lg:flex-none">
          <div className="form-control mx-8">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>

        {!user ? (
          <button className="btn">
            <a href="/api/auth/login">Sign In</a>
          </button>
        ) : (
          <>
            <Link href={'/post/new'} passHref>
              <a className="btn px-8 btn-ghost bg-transparent btn-lg rounded-btn text-gray-400">
                <BsFillPlusSquareFill />
              </a>
            </Link>

            <NavBaritemProfile />
          </>
        )}
      </div>
    </nav>
  );
}
