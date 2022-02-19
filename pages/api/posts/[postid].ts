import type { NextApiRequest, NextApiResponse } from 'next';

type BodyData = {
  postid: string;
};

type BodyError = {
  error: string;
};

type ResBody = BodyData | BodyError;

const endpoint = async (req: NextApiRequest, res: NextApiResponse<ResBody>) => {
  const { postid } = req.query as { postid: string };

  try {
    // ID IS A VALID NUMBER
    return res.status(200).json({ postid });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
  }
};

export default endpoint;
