import { axiosBackend } from './commons';

export const getPostPage = async (page: number, search: string) => {
  const r = await axiosBackend.get<PaginatedData<Post>>('/api/p', {
    params: { page, search },
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

/**
 * Fonction qui fetch si un utilisateur a déjà aimé un post.
 * @param accessToken Le accessToken de l'utilisateur
 * @param id Le id du post
 * @returns Un object avec la propriété `hasLiked`
 */
export const hasLiked = async (accessToken: string, id: string) => {
  const res = await axiosBackend.get<{ hasLiked: boolean }>(
    `/api/p/${id}/like`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

/**
 * utilisation du axiosBackend pour addlike
 * @author My-Anh Chau
 */
export const addLike = async (accessToken: string, idPost: string) => {
  await axiosBackend.post(`/api/p/${idPost}/like`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * utilisation du axiosBackend pour unlike
 * @author My-Anh Chau
 */
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
