import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { getPostPage } from 'libs/posts';
import { BACKEND_URL } from 'libs/commons';
import { testErrors } from 'libs/commons';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile', 'email'],
  });
  req.headers.authorization = `Bearer ${accessToken}`;
  httpProxyMiddleware(req, res, {
    target: BACKEND_URL,
    pathRewrite: [
      {
        patternStr: '^/api/posts',
        replaceStr: '/api/p',
      },
    ],
  });
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  // get number page
  const { p, s } = req.query;
  let page = typeof p === 'string' ? parseInt(p, 10) : 1;
  if (Number.isNaN(page)) page = 1;
  const search = !!s && typeof s === 'string' ? s : '';

  try {
    const posts = await getPostPage(page, search);
    return res.status(200).json(posts);
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).json(e);
  }
};

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await withApiAuthRequired(handlePost)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default endpoint;
