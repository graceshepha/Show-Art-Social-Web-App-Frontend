import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import ActiveLink from './ActiveLink'

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
        <button className="btn">Sign In</button>
        <div className="dropdown dropdown-left">
            <Image
              tabIndex={0}
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-1 btn"
              src="https://i.pravatar.cc/500?img=32"
              alt=''
              width={48}
              height={48}
            />
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
