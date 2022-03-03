import Image from 'next/image';
import Link from 'next/link';

type PostCardProps = {
  post: Post;
};

type PostCard = (props: PostCardProps) => React.ReactElement;

/**
 * Composant pour l'affichage de chaque post dans une liste de posts.
 *
 * @author Bly Grâce Schephatia
 */
const PostCard: PostCard = ({ post }) => (
  <div className="w-full antialiased hover:shadow-xl hover:scale-105 hover:z-10 overflow-hidden transition-all duration-300 ease-in-out">
    <Link href={`/post/${post.id}`} passHref>
      <article className="relative">
        <div className="aspect-square w-full">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            className="rounded-md object-cover object-center"
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t from-gray-900/90 to-gray-900/40 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out select-none">
          <div className="absolute top-4 left-4 font-bold break-words capitalize text-slate-100/80">
            {post.title}
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2 mt-2 items-center">
            {post?.owner?.picture && (
              <Image
                className="rounded-full object-cover"
                src={post.owner.picture}
                alt="owner-picture"
                width={48}
                height={48}
              />
            )}
            <p className="font-semibold capitalize text-slate-100/80">
              {post.owner.username}
            </p>
          </div>
        </div>
      </article>
    </Link>
  </div>
);

export default PostCard;
