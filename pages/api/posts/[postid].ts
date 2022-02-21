import type { NextApiRequest, NextApiResponse } from 'next';
import { testErrors } from 'utils/api/common';
// import { axiosBackend } from 'utils/axiosApi';

// type ResponseData = {
//   postid: Post;
// };

type ResponseData = {
  postid: string;
};

type ResponseError = {
  status: number;
  error: string;
};

type ResponseBody = ResponseData | ResponseError;

const endpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) => {
  const { postid } = req.query as { postid: string };

  try {
    // wait for the route to exist
    // const r = await axiosBackend.get(`/p/${postid}`);
    // const data: ResponseData = r.data;

    // return res.status(200).json(data);
    return res.status(200).json({ postid });
  } catch (err) {
    console.error(err);
    const e = testErrors(err);
    res.status(e.status).json(e);
  }
};

export default endpoint;
