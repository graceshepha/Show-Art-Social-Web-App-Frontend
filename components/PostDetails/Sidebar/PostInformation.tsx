type PostInformationProps = Pick<Post, 'title' | 'description' | 'meta'>;

type PostInformation = (
  props: PostInformationProps
) => React.ReactElement<PostInformationProps>;

const PostInformation: PostInformation = ({ title, description, meta }) => {
  return (
    <div className="sidebar-userdetails prose prose-zinc dark:prose-invert m-4 mx-7">
      <h1>{title}</h1>
      <p>{description ? description : 'description...'}</p>
      <p>
        views: {meta.views} likes: {meta.likes.length}
      </p>
    </div>
  );
};

export default PostInformation;