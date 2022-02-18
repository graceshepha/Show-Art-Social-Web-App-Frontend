import { useEffect } from 'react';
import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';

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
