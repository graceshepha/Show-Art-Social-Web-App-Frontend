import { BACKEND_POSTS } from 'constants/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

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

type RequestExtended = Omit<NextApiRequest, 'body'> & {
  body: BodyData;
};

const endpoint = async (req: NextApiRequest, res: NextApiResponse<ResBody>) => {
  httpProxyMiddleware(req, res, {
    target: `${BACKEND_POSTS}`,
    pathRewrite: [
      {
        patternStr: '^/api/post/new',
        replaceStr: '/add',
      },
    ],
  });
};

export default endpoint;
