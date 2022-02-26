import { axiosBackend } from './commons';

export const getPostPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<Post>>('/api/p', {
    params: { page },
  });
  return r.data;
};

export const getPostDetailsById = async (id: string) => {
  const r = await axiosBackend.get<Post>(`/api/p/${id}`);
  return r.data;
};

export const commentOnPostId = async (
  accessToken: string,
  id: string,
  comment: string
) => {
  await axiosBackend.post(
    `/api/p/${id}/comment`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const registerView = async (id: string) => {
  await axiosBackend.post(`/api/p/${id}/view`);
};
