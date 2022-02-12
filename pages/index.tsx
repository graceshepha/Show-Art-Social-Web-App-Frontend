import { NextPage } from 'next'
import Nav from '../components/NavBar'

const Home: NextPage = () => (
  <div>
    <Nav/>
    <p>Hello, Im the home page</p>
  </div>
)

export default Home
/* import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <div>
        <NavBar/>
      </div>
        <p>
          {JSON.stringify(user)}
        </p>

    </div>
  )
}

export default Home
 */