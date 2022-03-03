import { axiosBackend } from './commons';

/**
 * Fonction pour fetch une page d'utilisateurs.
 * @param page page a aller chercher
 * @returns Une liste d'utilisateurs paginée
 * @author Roger Montero
 */
export const getUserPage = async (page: number) => {
  const r = await axiosBackend.get<PaginatedData<User>>('/api/u', {
    params: { page },
  });
  return r.data;
};

/**
 * Fonction pour fetch les informations de l'utilisateur connecté a partir de son
 * accessToken
 * @param accessToken accessToken du client
 * @returns Les details de l'utilisateur
 * @author Roger Montero
 */
export const getProfile = async (accessToken: string) => {
  const r = await axiosBackend.get<User>('/api/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return r.data;
};

/**
 * Fonction pour fetch les informations d'un utilisateur à partir de son username.
 * @param username username de l'utilisateur à trouver
 * @returns Les details de l'utilisateur
 * @author Roger Montero
 */
export const getProfileByUsername = async (username: string) => {
  const r = await axiosBackend.get<User>(`/api/u/${username}`);
  return r.data;
};

/**
 * Fonction pour fetch les posts d'un utilisateur à partir de son username.
 * @param username username de l'utilisateur à trouver
 * @returns Les posts de l'utilisateur
 * @author Bly, Grace Schephatia
 */
export const getUserPosts = async (username: string) => {
  const r = await axiosBackend.get<Post[]>(`/api/u/${username}/posts`);
  return r.data;
};

/**
 * Fonction pour fetch les posts qu'un utilisateur a like à partir de son username.
 * @param username username de l'utilisateur à trouver
 * @returns Les posts aimés de l'utilisateur
 * @author Bly, Grace Schephatia
 */
export const getUserLikes = async (username: string) => {
  const r = await axiosBackend.get<Post[]>(`api/u/${username}/likes`);
  return r.data;
};

/**
 * Fonction pour get les followers d'un utilisateur à partir de son username.
 * @param username username de l'utilisateur à trouver
 * @returns Les followers de l'utilisateur
 * @author Bly, Grace Schephatia
 */
export const getUserFollowers = async (username: string) => {
  const r = await axiosBackend.get<User[]>(`api/u/${username}/followers`);
  return r.data;
};

/**
 * Fonction pour get les utilisateurs qu'un utilisateur a follow à partir de son username.
 * @param username username de l'utilisateur à trouver
 * @returns Les utilisateurs suivis de l'utilisateur
 * @author Bly, Grace Schephatia
 */
export const getUserFollowing = async (username: string) => {
  const r = await axiosBackend.get<User[]>(`api/u/${username}/following`);
  return r.data;
};
