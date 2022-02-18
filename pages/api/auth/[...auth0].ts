import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { BACKEND_USERS } from 'constants/api';

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

  try {
    const r = axios.post(`${BACKEND_USERS}/add`, {
      username,
      email,
      picture,
      emailVerified,
    });
    console.log(r);
  } catch (err) {
    console.error(err);
  }
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
