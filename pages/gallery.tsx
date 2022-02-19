import { NextPage } from 'next';
import useSWRInfinite from 'swr/infinite';
import axiosApi from 'utils/axiosApi';
import ListPosts from '@/ListPosts';

type KeyLoader = InfiniteKeyLoader<PaginatedPosts>;
type Fetcher = InfiniteFetcher<PaginatedPosts, KeyLoader>;

const getKey: KeyLoader = (pageIndex, previousPageData) => {
  console.log(previousPageData);
  if (pageIndex === 0 || !previousPageData) return `/api/posts`;
  if (!previousPageData.hasNextPage) return null;
  return `/api/posts?p=${previousPageData.nextPage}`;
};

const fetcher: Fetcher = (url) => axiosApi.get(url).then((res) => res.data);

const GalleryPage: NextPage = () => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);
  return (
    <>
      <div className="lg:mx-auto px-8 py-4">
        <p>Gallery page</p>
        <ListPosts pages={data} />
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </div>
    </>
  );
};

export default GalleryPage;
