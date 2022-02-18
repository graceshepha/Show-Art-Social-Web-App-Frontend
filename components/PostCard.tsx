import React from 'react';

// TYPING WITH NO CHILDREN
type PostCardProps = {
  example: string;
};
// TYPING METHOD WITHOUT CHILDREN
type PostCard = (props: PostCardProps) => React.ReactElement;

// TYPE OF PROPS AND CHILDREN
// type PostCardPropsAndChildren = React.PropsWithChildren<PostCardProps>;
// TYPING METHOD WITH CHILDREN
// type PostCard = (props: PostCardPropsAndChildren) => React.ReactElement;

/**
 * @author
 */
const PostCard: PostCard = ({ ...props }) => {
  return <>{props.example}</>;
};

export default PostCard;
