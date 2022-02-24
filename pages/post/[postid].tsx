import PostDetails from '@/PostDetails/PostDetails';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { SWRConfig, unstable_serialize } from 'swr';
import { getPostDetailsById } from 'utils/api/posts';

type PostPageProps = {
  fallback: {
    [K: string]: Post;
  };
};

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

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  // If the route is like /post/1, then params.postid is 1
  const id = params?.postid as string;
  // Fetch static info less likely to update
  try {
    const post = await getPostDetailsById(id);

    return {
      props: {
        fallback: {
          [unstable_serialize(['posts', `${id}`])]: post,
        },
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

const PostPage = ({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { postid } = router.query as { postid: string };

  return (
    <SWRConfig value={{ fallback }}>
      <PostDetails id={postid} />
    </SWRConfig>
  );
};

export default PostPage;
