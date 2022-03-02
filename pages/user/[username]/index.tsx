import { NextPage } from 'next';
import { useUser } from 'data/use-user';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import UserPageLayout from '@/UserProfile/UserPageLayout';


const UserPage: NextPage = () => {
  const { user } = useUser();
  if (!user) return <></>
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <UserPageLayout user={user} path={'posts'} />
      </div>
    </>
  )
};
export const getServerSideProps = withPageAuthRequired();

export default UserPage;
