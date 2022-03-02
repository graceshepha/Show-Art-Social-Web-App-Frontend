import { axiosApi } from 'libs/commons';
import { useUser } from '@auth0/nextjs-auth0';

type PostInformationProps = Pick<Post, 'id' | 'title' | 'description' | 'meta'>;

type PostInformation = (
  props: PostInformationProps
) => React.ReactElement<PostInformationProps>;

const PostInformation: PostInformation = ({ id, title, description, meta }) => {
  const { user } = useUser();
  const likes = async () => {
    try {
      await axiosApi.post(`/api/posts/${id}/like`);
    } catch (err) {
      console.error(err);
    }
  };
  const unlike = async () => {
    try {
      await axiosApi.delete(`/api/posts/${id}/like`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar-userdetails prose prose-zinc dark:prose-invert max-w-full p-5 break-words">
      <h1>{title}</h1>
      <p>{description ? description : 'description...'}</p>
      {user && (
        <div className="flex gap-3">
          <button className="btn btn-outline btn-primary" onClick={likes}>
            Like
          </button>
          <button className="btn btn-outline btn-primary" onClick={unlike}>
            Unlike
          </button>
        </div>
      )}
      <p>
        views: {meta.views} likes: {meta.likes.length}
      </p>
    </div>
  );
};

export default PostInformation;
