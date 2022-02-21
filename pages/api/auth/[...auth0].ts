import {
  AfterCallback,
  handleAuth,
  handleCallback,
  UserProfile,
} from '@auth0/nextjs-auth0';
import axios from 'axios';
import { axiosBackend } from 'utils/axiosApi';

const afterCallback: AfterCallback = async (req, res, session) => {
  const user: UserProfile = session.user;
  const body = {
    username: user.nickname,
    email: user.email,
    picture: user.picture,
    emailVerified: user.email_verified,
  };

  try {
    const r = await axiosBackend.post('/api/u/login', body, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
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
