import { getProfile } from 'libs/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { testErrors } from 'libs/commons';

/**
 * La route qui va être appeler lorsqu'on veux fetch les informations de l'utilisateur.
 *
 * @author Bly, Grâce Schephatia
 */
const handleGetUserProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'email'],
    });
    if (!accessToken) {
      console.log('AccessToken undefined');
    } else {
      const user = await getProfile(accessToken);
      return res.status(200).json(user);
    }
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).json(e);
  }
};

export default handleGetUserProfile;
