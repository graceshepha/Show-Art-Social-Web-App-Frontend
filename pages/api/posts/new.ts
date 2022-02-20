import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { BACKEND_URL } from 'constants/api';

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

type ResBody = BodyData | BodyError;

const endpoint = async (req: NextApiRequest, res: NextApiResponse<ResBody>) => {
  const { accessToken } = await getAccessToken(req, res);
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

export default withApiAuthRequired(endpoint);
