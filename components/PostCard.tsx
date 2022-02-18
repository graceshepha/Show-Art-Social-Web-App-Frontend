import React from 'react';

// il y a deux facons d'import
import ActiveLink1 from 'components/ActiveLink'; // tu peux dire `components/` (plus besoin de faire des routes relatives)
import ActiveLink2 from '@/ActiveLink'; // ou utiliser le `@/` a la place qui est traduit a `components/`

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
  example: string;
};

type PostCard = (props: PostCardProps) => React.ReactElement;

/**
 * @author
 */
const PostCard: PostCard /* u give type to the function variable */ = ({
  ...props
}) => {
  return <>{props.example}</>;
};

export default PostCard;
