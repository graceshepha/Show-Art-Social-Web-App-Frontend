import type { NextApiRequest, NextApiResponse } from 'next';
import { testErrors } from 'libs/commons';
import { getPostDetailsById } from 'libs/posts';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postid } = req.query as { postid: string };

  try {
    const post = await getPostDetailsById(postid);
    res.status(200).json(post);
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default endpoint;
