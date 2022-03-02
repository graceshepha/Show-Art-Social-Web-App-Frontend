import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default Home;
