import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import TextField from '../components/TextField';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div> Loading ... </div>;
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <div className="p-10 card bg-slate-600">
        <TextField
          size="lg"
          placeholder="Named"
          accent="error"
          variant="bordered"
          rounded
        >
          <span>Hey</span>
        </TextField>
      </div>
    </div>
  );
};

export default Home;
