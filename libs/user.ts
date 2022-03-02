import { axiosBackend } from './commons';

export const getUserPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<User>>('/api/u', {
    params: { page },
  });
  return r.data;
};

export const getProfile = async (accessToken: string) => {
  const r = await axiosBackend.get<User>('/api/me', {
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

/**
 * @author Bly, Grace Schephatia
 *
 */
export const getUserPosts = async (id: string) => {
  const r = await axiosBackend.get<User>(`/api/u/${id}/posts`);
  return r.data;
};

export const getUserLikes = async (id: string) => {
  const r = await axiosBackend.get<User>(`api/u/${id}/likes`);
  return r.data;
};

export const getUserFollowers = async (id: string) => {
  const r = await axiosBackend.get<User>(`api/u/${id}/followers`);
  return r.data;
};

export const getUserFollowing = async (id: string) => {
  const r = await axiosBackend.get<User>(`api/u/${id}/following`);
  return r.data;
};
