import type { NextApiRequest, NextApiResponse } from 'next';
import { testErrors } from 'utils/api/common';
import { getPostDetailsById } from 'utils/api/posts';

// type ResponseData = Post;

type ResponseError = {
  status: number;
  error: string;
};

type ResponseBody = Post | ResponseError;

const endpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) => {
  const { postid } = req.query as { postid: string };

  try {
    const post = await getPostDetailsById(postid);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    const e = testErrors(err);
    res.status(e.status);
  }
};

export default endpoint;
