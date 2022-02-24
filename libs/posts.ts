import { axiosBackend } from './commons';

export const getPostPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<Post>>('/api/p', {
    params: { page },
  });
  return r.data;
};

export const getPostDetailsById = async (postId: string) => {
  const r = await axiosBackend.get<Post>(`/api/p/${postId}`);
  const data = r.data;

  return data;
};

export const registerView = async (postId: string) => {
  await axiosBackend.post(`/api/p/${postId}/view`);
};
