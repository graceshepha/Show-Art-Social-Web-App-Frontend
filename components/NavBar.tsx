import { useUser } from '@auth0/nextjs-auth0';
import ActiveLink from './ActiveLink'
import NavBaritemProfile from './NavBarItemProfile';

/**
 * NavBar Componenent
 * 
 * @author Bly Grâce Schephatia
 */

type navItem = {
  name: string;
  href: string;
}

const navigation: navItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Arts', href: '/arts' },
  { name: 'Topis', href: '/topics' }
]


export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <style jsx>{`
      .active {
        font-weight: bold;
      }
    `}
      </style>
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">
          showArts
        </span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          {navigation.map((item) => (
            <ActiveLink activeClassName="active" key={item.href} href={item.href}>
              <a className="btn btn-ghost btn-sm rounded-btn">
                {item.name}
              </a>
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="mt-3 flex space-x-2 navbar-end">
        {!user ? (
          <button className="btn">
            <a href="/api/auth/login">
              Sign In
            </a>
          </button>
        ) : (
          <NavBaritemProfile />
        )}
      </div>
    </nav>
  )
}
