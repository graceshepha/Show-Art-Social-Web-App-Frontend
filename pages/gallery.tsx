import { NextPage } from 'next';
import ListPosts from '@/ListPosts';
import { useGallery } from 'data/use-gallery';

const GalleryPage: NextPage = () => {
  const { posts, error, size, setSize } = useGallery();
  return (
    <>
      <div className="lg:mx-auto px-8 py-4">
        <p>Gallery page</p>
        <ListPosts pages={posts} />
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </div>
    </>
  );
};

export default GalleryPage;
