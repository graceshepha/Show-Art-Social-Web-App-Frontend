import { axiosApi, testErrors } from 'libs/commons';

export type CustomError = Error & {
  info?: string;
  status?: number;
};

type PathsMap = {
  posts: Post;
  user: User;
};

type Paths = keyof PathsMap;

export type KeyPathId<Path extends Paths> = [P: Path, I: string];

export const fetcherPathId = async <Path extends Paths>(
  path: Path,
  id: string
) => {
  try {
    const res = await axiosApi.get<PathsMap[typeof path]>(`/api/${path}/${id}`);
    return res.data;
  } catch (err) {
    const _e = testErrors(err);
    const e: CustomError = new Error(_e.error);
    e.info = _e.error;
    e.status = _e.status;

    throw e;
  }
};

// Add a fetcher pour get les infos d'un user
