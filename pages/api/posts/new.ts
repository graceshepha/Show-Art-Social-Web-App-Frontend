import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { BACKEND_URL } from 'consts';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

type BodyData = {
  data: string;
};

type BodyError = {
  status: number;
  error: string;
};

type ResponseData = BodyData | BodyError;

const handleProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile', 'email'],
  });
  req.headers.authorization = `Bearer ${accessToken}`; // i think
  httpProxyMiddleware(req, res, {
    target: BACKEND_URL,
    pathRewrite: [
      {
        patternStr: '^/api/posts/new',
        replaceStr: '/api/p/add',
      },
    ],
  });
};

const endpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  // wrapper for the proxy maybe ?
  console.debug('before: ', res);
  await handleProxy(req, res);
  console.debug('after ', res);
};

export default withApiAuthRequired(endpoint);
