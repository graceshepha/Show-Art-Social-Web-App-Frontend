import { NextPage } from 'next';
import Nav from '../components/NavBar';
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <div>
        <Nav />
      </div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default Home;
