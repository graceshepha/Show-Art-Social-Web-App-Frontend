import { axiosBackend } from 'utils/axiosApi';

type PagePost = PaginatedData<Post>;

export const getPostPage = async (page: number) => {
  const r = await axiosBackend.get('/api/p', { params: { page } });
  return r.data as PagePost;
};

export const getPostDetailsById = async (postId: string) => {
  const r = await axiosBackend.get(`/api/p/${postId}`);
  const data = r.data as Post;

  return data;
};
