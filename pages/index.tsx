import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div> Loading ... </div>
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default Home;
