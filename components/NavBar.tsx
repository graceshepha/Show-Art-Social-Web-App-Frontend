import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
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
      .nav-link {
        text-decoration: none;
      }
      .active:after {
        content: ' (current)';
      }
    `}</style>
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">
          daisyUI
        </span>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          {navigation.map((item) => (
            <ActiveLink activeClassName="active" key={item.href} href={item.href}>
              <a className="btn btn-ghost btn-sm rounded-btn">{item.name}</a>
            </ActiveLink>
          ))}
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" s="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}
