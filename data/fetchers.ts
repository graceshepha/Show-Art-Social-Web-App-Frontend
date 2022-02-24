import { axiosApi, testErrors } from 'libs/commons';

type CustomError = Error & {
  info?: string;
  status?: number;
};

export const fetcherPathId = async (path: string, id: string) => {
  try {
    const res = await axiosApi.get<Post>(`/api/${path}/${id}`);
    return res.data;
  } catch (err) {
    const _e = testErrors(err);
    const e: CustomError = new Error(_e.error);
    e.info = _e.error;
    e.status = _e.status;

    throw e;
  }
};
