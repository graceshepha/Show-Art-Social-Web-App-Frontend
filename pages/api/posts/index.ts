import { testErrors } from './../../../utils/api/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostPage } from 'utils/api/posts';

type ResponseData = PaginatedPosts;

type ResponseError = {
  status: number;
  error: string;
};

type ResponseBody = ResponseData | ResponseError;

const endpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) => {
  // get number page
  const { p } = req.query;
  let page = typeof p === 'string' ? parseInt(p, 10) : 1;
  if (Number.isNaN(page)) page = 1;

  try {
    const posts = await getPostPage(page);
    return res.status(200).json(posts);
  } catch (err) {
    // console.error(err);
    const e = testErrors(err);
    res.status(e.status).json(e);
  }
};
export default endpoint;
