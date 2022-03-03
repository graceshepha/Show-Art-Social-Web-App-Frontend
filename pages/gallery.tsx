import { NextPage } from 'next';
import ListPosts from '@/ListPosts';
import { useGallery } from 'data/use-gallery';

/**
 * La page pour la gallery des posts.
 *
 * @author Roger Montero
 */
const GalleryPage: NextPage = () => {
  const { posts, size, setSize } = useGallery();
  return (
    <>
      <div className="lg:mx-auto px-8 py-4">
        <ListPosts pages={posts} loadMore={() => setSize(size + 1)} />
      </div>
    </>
  );
};

export default GalleryPage;
