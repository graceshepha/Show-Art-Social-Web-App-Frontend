import { axiosApi } from 'libs/commons';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

type PostInformationProps = Pick<
  Post,
  'id' | 'title' | 'description' | 'meta'
> & {
  onLikeChange: (like: boolean) => void;
};

type PostInformation = (
  props: PostInformationProps
) => React.ReactElement<PostInformationProps>;

const fetcherLiked = (url: string) =>
  axiosApi.get<{ hasLiked: boolean }>(url).then((res) => res.data.hasLiked);

/**
 * Composant pour afficher toutes les informations du post.
 *
 * @author Roger Montero
 */
const PostInformation: PostInformation = ({
  id,
  title,
  description,
  meta,
  onLikeChange,
}) => {
  const { user } = useUser();
  const { data: hasLiked, mutate } = useSWR(
    user ? `/api/posts/${id}/like` : null,
    fetcherLiked
  );

  /**
   * Fonction pour ajouter un like du post.
   *
   * @author My-Anh Chau
   */
  const likes = async () => {
    try {
      await axiosApi.post(`/api/posts/${id}/like`);
      mutate(true); // like
      onLikeChange(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Fonction pour enlever son like du post.
   *
   * @author My-Anh Chau
   */
  const unlike = async () => {
    try {
      await axiosApi.delete(`/api/posts/${id}/like`);
      mutate(false); // disliking
      onLikeChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar-userdetails prose prose-zinc dark:prose-invert max-w-full p-5 break-words">
      <h1>{title}</h1>
      <p>{description ? description : 'description...'}</p>
      {user &&
        (!hasLiked ? (
          <button className="btn btn-outline btn-primary" onClick={likes}>
            Like
          </button>
        ) : (
          <button className="btn btn-outline btn-primary" onClick={unlike}>
            Unlike
          </button>
        ))}
      <p>
        views: {meta.views} likes: {meta.likes.length}
      </p>
    </div>
  );
};

export default PostInformation;
