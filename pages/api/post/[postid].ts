import type { NextApiRequest, NextApiResponse } from 'next';

type BodyData = {
  postid: number;
};

type BodyError = {
  error: string;
};

type ResBody = BodyData | BodyError;

const endpoint = async (req: NextApiRequest, res: NextApiResponse<ResBody>) => {
  const { postid } = req.query as { postid: string };
  const id = parseInt(postid, 10);

  try {
    if (isNaN(id)) throw new Error("That isn't a valid id");
    if (id !== Number(postid)) return res.redirect(`/api/post/${id}`);

    return res.status(200).json({ postid: id });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ error: err.message });
  }
};

export default endpoint;
