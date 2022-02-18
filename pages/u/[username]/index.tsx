import { NextPage } from 'next';
import { useRouter } from 'next/router';

const UserPage: NextPage = (props) => {
  const router = useRouter();
  const { username } = router.query;
  return <p>User: {username}</p>;
};

export default UserPage;
