import { axiosBackend } from './commons';

export const getPostPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<Post>>('/api/p', {
    params: { page },
  });
  return r.data;
};

export const getPostDetailsById = async (id: string) => {
  const r = await axiosBackend.get<Post>(`/api/p/${id}`);
  const data = r.data;

  return data;
};

export const registerView = async (id: string) => {
  await axiosBackend.post(`/api/p/${id}/view`);
};
