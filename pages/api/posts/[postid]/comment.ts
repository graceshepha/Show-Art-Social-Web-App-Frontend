import { commentOnPostId } from './../../../../libs/posts';
import { testErrors } from 'libs/commons';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  const { postid } = req.query as { postid: string };
  const { comment } = req.body as { comment: string };
  try {
    if (!accessToken) console.error('The access token has a falsely value');
    else await commentOnPostId(accessToken, postid, comment);
    res.status(201).end();
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await withApiAuthRequired(handlePost)(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default endpoint;
