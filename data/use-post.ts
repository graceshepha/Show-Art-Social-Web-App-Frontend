import useSWR from 'swr';
import { fetcherPathId, KeyPathId, CustomError } from './fetchers';

/**
 * Fonction à utiliser lorsqu'on veut fetch les informations d'un post.
 * @param postId id du post à chercher
 * @returns Un object avec les propriétés retournés par {@link useSWR SWR} pour voir l'information
 * @author Roger Montero
 */
export const usePost = (postId: string) => {
  const { data, error, mutate } = useSWR<Post, CustomError, KeyPathId<'posts'>>(
    ['posts', postId],
    fetcherPathId,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        console.log(error);
        // Never retry on 400 or 400
        if (error.status === 404 || error.status === 400) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return {
    error,
    post: data,
    mutate,
  };
};
