import { axiosBackend } from './commons';

export const getUserPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<User>>('/api/u', {
    params: { page },
  });
  return r.data;
};

export const getProfile = async (accessToken: string) => {
  const r = await axiosBackend.get<User>('/api/u/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return r.data;
};

export const getProfileById = async (id: string) => {
  const r = await axiosBackend.get<User>(`/api/u/${id}`);
  return r.data;
};
