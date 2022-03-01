import { axiosApi } from 'libs/commons';
import useSWR from 'swr';

const userFetcher = (url: string) => {
  axiosApi.get<User>(url).then((res) => res.data);
};

export const useUser = () => {
  const { data, error, mutate } = useSWR(userFetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    user: data,
    mutate,
  };
};
