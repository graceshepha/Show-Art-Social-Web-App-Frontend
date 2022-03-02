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
  const res = await axiosBackend.post<PostComment[]>(
    `/api/p/${id}/comment`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// Mettre celui pour like
export const addLike = async (accessToken: string, idPost: string) => {
  await axiosBackend.post(`/api/p/${idPost}/like`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Mettre celui pour unlike
export const removeLike = async (accessToken: string, idPost: string) => {
  await axiosBackend.delete(`/api/p/${idPost}/like`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const registerView = async (id: string) => {
  await axiosBackend.post(`/api/p/${id}/view`);
};
