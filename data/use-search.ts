import useSWRInfinite from 'swr/infinite';
import { axiosApi } from 'libs/commons';

type KeyLoader = InfiniteKeyLoader<Post[]>;

/**
 * Le fetcher pour {@link useSWRInfinite SWRInfinite}.
 * @param url route à fetch
 * @returns Une liste de post
 * @author Roger Montero
 */
const fetcher = (url: string) =>
  axiosApi.get<PaginatedData<Post>>(url).then((res) => res.data.docs);

/**
 * Fonction à utiliser lorsqu'on veut aller chercher une liste de posts a partir d'un filter.
 * @param search query pour filtrer les posts
 * @returns Un object avec les propriétés retournés par {@link useSWRInfinite SWRInfinite} pour la gestion de l'information
 * @author Roger Montero
 */
export const useSearch = (search: string) => {
  /**
   * Le keyLoader pour {@link useSWRInfinite SWRInfinite}.
   * @param pageIndex page à chercher
   * @param previousPageData informations de la page précédente.
   * @returns La route à utiliser pour fetch chacune des pages avec une valeur `&s=` avec le filtre
   * @author Roger Montero
   */
  const getKey: KeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `/api/posts?p=${pageIndex + 1}&s=${search}`;
  };
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  return {
    error,
    posts: data,
    mutate,
    size,
    setSize,
  };
};
