import React from 'react';
import { NextPage } from 'next';
import ImageUploader from './ImageUploader';

type NewPostProps = React.FormHTMLAttributes<HTMLFormElement>;

const NewPost: NextPage<NewPostProps> = ({ ...props }) => {
  return (
    <form {...props}>
      <ImageUploader />
    </form>
  );
};

export default NewPost;
