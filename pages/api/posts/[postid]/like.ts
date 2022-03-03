import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasLiked, addLike, removeLike } from 'libs/posts';
import { testErrors } from 'libs/commons';

/**
 * Fonction de la route qui permet de voir si l'utilisateur à déjà like un post.
 * @author My-Anh Chau
 */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  const { postid } = req.query as { postid: string };
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    const response = await hasLiked(accessToken, postid);
    res.status(200).json(response);
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

/**
 * Fonction de la route qui permet d'ajouter un like à un post.
 * @author My-Anh Chau
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  const { postid } = req.query as { postid: string };
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    await addLike(accessToken, postid);
    res.status(204).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

/**
 * Fonction de la route qui permet de supprimer un like du post.
 * @author My-Anh Chau
 */
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  const { postid } = req.query as { postid: string };
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    await removeLike(accessToken, postid);
    res.status(204).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

/**
 * Le enpoint qui va guider la requête à partir de sa méthode.
 * @author My-Anh Chau
 */
const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  // methode de la requete
  switch (req.method) {
    case 'GET':
      // prendre la fct quil va faire
      await withApiAuthRequired(handleGet)(req, res);
      break;
    case 'POST':
      // prendre la fct quil va faire
      await withApiAuthRequired(handlePost)(req, res);
      break;
    case 'DELETE':
      await withApiAuthRequired(handleDelete)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default endpoint;
