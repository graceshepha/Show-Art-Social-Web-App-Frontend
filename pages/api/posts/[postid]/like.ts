import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { addLike, removeLike } from 'libs/posts';
import { testErrors } from 'libs/commons';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postid } = req.query as { postid: string };
  // Besoin d'acceder pr le token
  const { accessToken } = await getAccessToken(req, res);
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    console.log(postid + ' avant le addlike ' + accessToken);
    await addLike(accessToken, postid);
    res.status(204).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postid } = req.query as { postid: string };
  // Besoin du token
  const { accessToken } = await getAccessToken(req, res);
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    await removeLike(accessToken, postid);
    res.status(204).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

// ces quoi qui va definir la route
const endpts = async (req: NextApiRequest, res: NextApiResponse) => {
  // methode de la requete
  switch (req.method) {
    // POST ET DELETE , METHODE QUE JAI
    case 'POST':
      // prendre la fct quil va faire
      await withApiAuthRequired(handlePost)(req, res);

      break;

    case 'DELETE':
      await withApiAuthRequired(handleDelete)(req, res);

      break;
    default:
      // A EXPLIQUER
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default endpts;
