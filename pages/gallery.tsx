import { NextPage } from 'next';
import useSWRInfinite from 'swr/infinite';
import { axiosApi } from 'utils/axiosApi';
import ListPosts from '@/ListPosts';

type Item = Post;
type ResponseData = PaginatedData<Item>;
type KeyLoader = InfiniteKeyLoader<Post[]>;
type Fetcher = InfiniteFetcher<Post[], KeyLoader>;

const getKey: KeyLoader = (pageIndex, previousPageData) => {
  console.log(pageIndex);
  if (previousPageData && previousPageData.length === 0) return null;
  return `/api/posts?p=${pageIndex + 1}`;
};

const fetcher: Fetcher = (url) =>
  axiosApi.get<ResponseData>(url).then((res) => res.data.docs);

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
