// il y a deux facons d'import
// import ActiveLink1 from 'components/ActiveLink'; // tu peux dire `components/` (plus besoin de faire des routes relatives)
// import ActiveLink2 from '@/ActiveLink'; // ou utiliser le `@/` a la place qui est traduit a `components/`
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
const PostCard: PostCard = ({ ...props }) => (
  <div className="w-full antialiased hover:shadow-xl hover:scale-105 hover:z-10 overflow-hidden transition-all duration-300 ease-in-out">
    <Link href={`/post/${props.post.id}`} passHref>
      <article className="relative">
        <div className="aspect-square w-full">
          <Image
            src={props.post.image}
            alt={props.post.title}
            layout="fill"
            className="rounded-md object-cover object-center"
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-gray-900/90 to-gray-900/40 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out select-none">
          <div className="absolute top-4 left-4 font-bold break-words capitalize text-slate-100/80">
            {props.post.title}
          </div>
          {/* <div className="absolute bottom-4 left-4 flex gap-2 mt-2 items-center">
            {props.post?.owner && (
              <Image
                className="rounded-full object-cover"
                src={props.post.owner.picture}
                alt="owner-picture"
                width={48}
                height={48}
              />
            )}
            <p className="font-semibold capitalize text-slate-100/80">
              {props.post.owner.username}
            </p>
          </div> */}
        </div>
      </article>
    </Link>
  </div>
);

export default PostCard;
