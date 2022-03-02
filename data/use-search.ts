import useSWRInfinite from 'swr/infinite';
import { axiosApi } from 'libs/commons';

type KeyLoader = InfiniteKeyLoader<Post[]>;

const fetcher = (url: string) =>
  axiosApi.get<PaginatedData<Post>>(url).then((res) => res.data.docs);

export const useSearch = (search: string) => {
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
