import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'

const NavBaritemProfile = () => {
    const { user } = useUser();
    return (
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
                <p className="text-sky-400">{user?.nickname}</p>
                <p className="text-sky-400">{user?.email}</p>
                <div className="divider"></div>
                <li>
                    <a>Your profile</a>
                </li>
                <li>
                    <a href="/api/auth/logout">
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavBaritemProfile