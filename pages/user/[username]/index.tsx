import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useUser } from 'data/use-user';

const UserPage: NextPage = (props) => {
  const router = useRouter();
  const { username } = router.query;
  return <p>User: {username}</p>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch users 10 usernames
  const users: string[] = [];
  const paths = users.map((username) => ({
    params: { username },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}`);
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
};

export default UserPage;
