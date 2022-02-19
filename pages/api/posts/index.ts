import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_POSTS } from 'constants/api';

type Data = {
  name: string;
};

const endpoint = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { p } = req.query;
  const page = typeof p === 'string' ? parseInt(p, 10) : 1;

  try {
    const r = await axios.get(BACKEND_POSTS, { params: { page } });
    // console.log(r.data);
    res.status(200).json(r.data);
  } catch (err) {
    console.error(err);
  }
};
export default endpoint;
