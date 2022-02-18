import { useUser } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useEffect } from 'react';

const MePage: NextPage = (props) => {
  const { user } = useUser();

  useEffect(() => {
    const getUserInfo = () => {
      // TODO FETCH USER INFO FROM THING
    };
  }, [user]);
  return <></>;
};
export default MePage;
