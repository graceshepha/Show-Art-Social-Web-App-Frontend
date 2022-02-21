import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

const PostPage: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => <></>;

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch posts ids
  const posts: string[] = [];
  const paths = posts.map((post) => ({
    params: { post },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // If the route is like /post/1, then params.postid is 1
  const id = params?.postid;
  // Fetch static info less likely to update
  const res = await fetch(`/api/posts/${id}`);
  const post = await res.json();
  if (!post) return { notFound: true };

  // Pass post data to the page via props
  return { props: { post } };
};

export default PostPage;
