import { axiosBackend } from './commons';

/**
 * Fonction pour fetch une page de post avec un search query.
 * @param page page a aller chercher
 * @param search query a chercher
 * @returns Une liste de posts paginée
 * @author Roger Montero
 */
export const getPostPage = async (page: number, search: string) => {
  const r = await axiosBackend.get<PaginatedData<Post>>('/api/p', {
    params: { page, search },
  });
  return r.data;
};

/**
 * Fonction pour fetch un post en particuler avec son id.
 * @param id id du post
 * @returns Un post
 * @author Roger Montero
 */
export const getPostDetailsById = async (id: string) => {
  const r = await axiosBackend.get<Post>(`/api/p/${id}`);
  return r.data;
};

/**
 * Function pour donner un commentaire à un post.
 * @param accessToken accessToken du client
 * @param id id du post
 * @param comment commentaire a insérer
 * @returns Liste de commentaires
 * @author Roger Montero
 */
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
 * Fonction pour fetch si un utilisateur a déjà aimé un post.
 * @param accessToken accessToken du client
 * @param id id du post
 * @returns Un object avec la propriété `hasLiked`
 * @author Roger Montero
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
 * Fonction pour ajouter un like à un post.
 * @param accessToken accessToken du client
 * @param id id du post
 * @author My-Anh Chau
 */
export const addLike = async (accessToken: string, id: string) => {
  await axiosBackend.post(`/api/p/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Fonction pour enlever son like sur un post.
 * @param accessToken accessToken du client
 * @param id id du post
 * @author My-Anh Chau
 */
export const removeLike = async (accessToken: string, id: string) => {
  await axiosBackend.delete(`/api/p/${id}/like`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Fonction pour ajouter un view à un post.
 * @param id id du post
 * @author Roger Montero
 */
export const registerView = async (id: string) => {
  await axiosBackend.post(`/api/p/${id}/view`);
};
