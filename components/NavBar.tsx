import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import NavBaritemProfile from './NavBarItemProfile';

/**
 * NavBar Componenent
 *
 * @author Bly Grâce Schephatia
 */

type navItem = {
  name: string;
  href: string;
};

const navigation: navItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Arts', href: '/arts' },
  { name: 'Topis', href: '/topics' },
];

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <style jsx>
        {`
          .active {
            color: rgb(255 255 255);
          }
        `}
      </style>
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
            <Link href="/api/auth/login">Sign In</Link>
          </button>
        ) : (
          <NavBaritemProfile />
        )}
      </div>
    </nav>
  );
}
