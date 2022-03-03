import {
  AfterCallback,
  handleAuth,
  handleCallback,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { axiosBackend, testErrors } from 'libs/commons';

/**
 * Fonction qui va envoyer les informations d'un utilisateurs au backend de notre application
 * au moment de la connexion d'un utilisateur.
 *
 * @author Roger Montero
 */
const afterCallback: AfterCallback = async (req, res, session) => {
  const user: UserProfile = session.user;

  try {
    await axiosBackend.post<User>(
      '/api/u/login',
      {
        username: user.nickname,
        email: user.email,
        picture: user.picture,
        emailVerified: user.email_verified,
      },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    return session;
  } catch (err) {
    throw err;
  }
};

export default handleAuth({
  callback: async (req, res) => {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
      if (err instanceof Error) {
        const e = testErrors(err);
        res.status(e.status).json(e);
      }
    }
  },
});
