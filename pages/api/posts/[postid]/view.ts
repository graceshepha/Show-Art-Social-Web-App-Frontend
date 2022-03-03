import { testErrors } from 'libs/commons';
import { registerView } from 'libs/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Le POST de la route qui va être appeler lorsqu'on veux ajouter un view dans un post.
 *
 * @author Roger Montero
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postid } = req.query as { postid: string };

  try {
    await registerView(postid);
    res.status(201).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

/**
 * La fonction qui va diriger les requêtes dépendamment de sa méthode.
 */
const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default endpoint;
