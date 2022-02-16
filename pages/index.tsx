import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import NewPost from '../components/NewPost';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div> Loading ... </div>;

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <NewPost />
    </div>
  );
};

export default Home;
