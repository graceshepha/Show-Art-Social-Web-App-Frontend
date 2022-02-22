// il y a deux facons d'import
// import ActiveLink1 from 'components/ActiveLink'; // tu peux dire `components/` (plus besoin de faire des routes relatives)
// import ActiveLink2 from '@/ActiveLink'; // ou utiliser le `@/` a la place qui est traduit a `components/`
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'

/*
########### TYPING PROPS #################
1. type with no children:
  type PostCardProps = { example: string };

2. or use `React.PropsWithChildren<T>` with T being the custom types to add children to the types:
  type PostCardPropsAndChildren = React.PropsWithChildren<PostCardProps>;

you can do that in 1 shot by saying:
  type PostCardPropsAndChildren = React.PropsWithChildren<{ example: string }>;

########### TYPING METHODS #################
1. type method with no children:
  type PostCard = (props: PostCardProps) => React.ReactElement;

2. or use the type `PostCardPropsAndChildren` on props to add children to the props:
  type PostCard = (props: PostCardPropsAndChildren) => React.ReactElement;
*/

type PostCardProps = {
  post: Post;
};

type PostCard = (props: PostCardProps) => React.ReactElement;
/**
 * @author Bly Grâce Schephatia
 */
const PostCard: PostCard = ({
  ...props
}) => {
  const [postHovered, setPostHovered] = useState(false);

  return (
    <div className="m-2">
      <Link href={`/post/${props.post.id}`} passHref>
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          className='relative aspect-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out'>
          <Image
            className="rounded-lg object-center"
            src={props.post.image}
            alt="post"
            width={250}
            height={250}
          />
          {postHovered && (
            <div
              className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
              style={{ height: '100%' }}
            >
              <div className="flex justify-between items-center gap-2 w-full">
                {props.post?.title && (
                  <div className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                    <p className="font-bold capitalize">{props.post?.title}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="flex gap-2 mt-2 items-center">
        {props.post?.owner &&
          <Image
            className="rounded-full object-cover"
            src={props.post?.owner?.picture}
            alt="owner-picture"
            width={48}
            height={48}
          />
        }
        <p className="font-semibold capitalize">{props.post?.owner?.username}</p>
      </div>
    </div>
  )
};

export default PostCard;