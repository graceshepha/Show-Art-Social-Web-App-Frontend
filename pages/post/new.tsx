import React from 'react';
import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import NewPostForm, { HandleSubmit } from '@/NewPostForm';
import { axiosApi } from 'libs/commons';
import Loading from '@/Loading';

/**
 * La page pour ajouter un nouveau post.
 *
 * @author Roger Montero
 */
const NewPostPage: NextPage = () => {
  const { isLoading } = useUser();

  /**
   * Fonction pour envoyer les informations du nouveau post.
   *
   * @author Roger Montero
   */
  const handleFormSubmit: HandleSubmit = async (values, helpers) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);
    else helpers.setErrors({ image: 'Missing image' });
    // formData.append(`tags[]`, JSON.stringify(values?.tags));

    try {
      await axiosApi.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 mx-auto p-7">
      {isLoading && <Loading />}
      <NewPostForm onSubmit={handleFormSubmit}></NewPostForm>
    </div>
  );
};

export default NewPostPage;

export const getServerSideProps = withPageAuthRequired();
