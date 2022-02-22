import { axiosBackend } from 'utils/axiosApi';

type PagePost = PaginatedData<Post>;

export const getUserPage = async (page: number) => {
  const r = await axiosBackend.get('/api/p', { params: { page } });
  return r.data as PagePost;
};
