import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { SWRConfig, unstable_serialize } from 'swr';
import PostDetails from '@/PostDetails/PostDetails';
import { getPostDetailsById } from 'libs/posts';
import { axiosApi } from 'libs/commons';
import Loading from '@/Loading';

type PostPageProps = {
  fallback: {
    [K: string]: Post;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch posts ids
  const posts: string[] = [];
  const paths = posts.map((postid) => ({
    params: { postid },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const id = params?.postid as string;
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

/**
 * La page détail d'un post.
 *
 * @author Roger Montero
 */
const PostPage = ({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { postid } = router.query as { postid: string };

  useEffect(() => {
    const registerView = async () => {
      try {
        await axiosApi.post(`/api/posts/${postid}/view`);
      } catch (err) {
        console.error(err);
      }
    };
    registerView();
  }, [postid]);

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <PostDetails id={postid} />
    </SWRConfig>
  );
};

export default PostPage;
