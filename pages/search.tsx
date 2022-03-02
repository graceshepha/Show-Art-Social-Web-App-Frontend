import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ListPosts from '@/ListPosts';
import { useSearch } from 'data/use-search';
import Loading from '@/Loading';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const query = q && typeof q === 'string' ? q : '';
  const { posts, size, setSize } = useSearch(query);

  if (!posts) return <Loading />;

  return (
    <div className="lg:mx-auto px-8 py-4">
      <ListPosts pages={posts} loadMore={() => setSize(size + 1)} />
    </div>
  );
};

export default SearchPage;
