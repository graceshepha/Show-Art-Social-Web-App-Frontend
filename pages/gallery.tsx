import { NextPage } from 'next';

// Declaring type of props - see "Typing Component Props" for more examples
type GalleryPageProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.

const GalleryPage: NextPage<GalleryPageProps> = ({ message }) => {
  return (
    <>
      <div>
        <p>Gallery page</p>
        <p>{message}</p>
      </div>
    </>
  );
};

export default GalleryPage;
