import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { axiosBackend } from 'utils/axiosApi';

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
  const { p } = req.query;
  const page = typeof p === 'string' ? parseInt(p, 10) : 1;

  try {
    const r = await axiosBackend.get('/api/p', { params: { page } });
    const data: ResponseData = r.data;

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      const status = err?.response?.status || 500;
      return res.status(status).json({ status, error: err.message });
    } else if (err instanceof Error) {
      return res.status(500).json({ status: 500, error: err.message });
    } else {
      return res.status(500).json({ status: 500, error: 'Unknown error' });
    }
  }
};
export default endpoint;
