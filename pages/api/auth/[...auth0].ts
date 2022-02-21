import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { axiosBackend } from 'utils/axiosApi';

/*
  UserDetails: {
    nickname,
    name (email),
    picture,
    updated_at,
    email,
    email_verified,
    sub
  }
 */

const afterCallback: AfterCallback = async (req, res, session) => {
  const {
    nickname: username,
    email,
    picture,
    email_verified: emailVerified,
  } = session.user;

  try {
    const r = await axiosBackend.post('/u/add', {
      username,
      email,
      picture,
      emailVerified,
    });
    console.debug(r.data); // get returned data
  } catch (err) {
    console.error(err);
    throw err;
  }
  return session;
};

export default handleAuth({
  callback: async (req, res) => {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
      if (err instanceof Error) {
        if (axios.isAxiosError(err))
          res.status(err.response?.status || 500).send(err.message);
        else res.status(500).send(err.message);
      } else res.status(500).send('Unknown error');
    }
  },
});
