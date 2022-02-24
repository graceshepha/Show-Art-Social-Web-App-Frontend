import useSWR from 'swr';
import { fetcherPathId } from './fetchers';

export const usePost = (postId: string) => {
  const { data, error, mutate } = useSWR(['posts', postId], fetcherPathId, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      console.log(error);
      // Never retry on 400 or 400
      if (error.status === 404 || error.status === 400) return;

      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  return {
    error,
    post: data,
    mutate,
  };
};
