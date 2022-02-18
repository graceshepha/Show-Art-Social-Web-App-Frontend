import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import getConfig from 'next/config';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants';

const config = getConfig();

type UserDetails = {
  username: string;
  email: string;
  picture: string;
  emailVerified: boolean;
};

/*
  User: {
    nickname,
    name (email),
    picture,
    updated_at,
    email,
    email_verified,
    sub
  }
 */

const afterCallback: AfterCallback = (req, res, session, state) => {
  const {
    nickname: username,
    email,
    picture,
    email_verified: emailVerified,
  } = session.user;

  axios
    .post(`${BACKEND_URL}/api/u/add`, {
      username,
      email,
      picture,
      emailVerified,
    })
    .then((v) => console.log(v))
    .catch((e) => console.error(e));
  return session;
};

export default handleAuth({
  callback: async (req, res) => {
    // try {
    //   await handleCallback(req, res, { afterCallback });
    // } catch (error) {
    //   res.status(error.status || 500).end(error.message);
    // }
    await handleCallback(req, res, { afterCallback });
  },
});
