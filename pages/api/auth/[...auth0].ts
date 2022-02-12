import { AfterCallback, handleAuth, handleCallback } from "@auth0/nextjs-auth0";

type UserDetails = {
  username: string;
  email: string;
  picture: string;
  email_verified: boolean;
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
  console.log("User: ");
  console.log(session.user) // get user details
  // TODO send to backend
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
