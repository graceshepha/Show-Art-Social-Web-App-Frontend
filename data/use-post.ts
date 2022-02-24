import axios from 'axios';
import useSWR from 'swr';
import { axiosApi } from 'utils/axiosApi';

type CustomError = Error & {
  status?: number;
};

const fetcher = async (path: string, id: string) => {
  try {
    const res = await axiosApi.get<Post>(`/api/${path}/${id}`);
    return res.data;
  } catch (err) {
    const e: CustomError = new Error('Error occured fetching data');
    e.status = axios.isAxiosError(err) ? err.response?.status : 500;
    console.error(err);
  }
};

export const usePost = (postId: string) => {
  const { data, error, mutate } = useSWR(['posts', postId], fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      console.log(error.status);
      // Never retry on 404 or 500
      if (error.status === 404 || error.status === 500) return;

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
