import { useState } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import NewPostForm, { FormikHandleSubmit } from '@/NewPostForm';
import Image from 'next/image';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [state, setState] = useState<File | undefined>();

  if (isLoading) return <div> Loading ... </div>;

  const handleFormSubmit: FormikHandleSubmit = (values, helpers) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);
    else helpers.setErrors({ image: 'Missing image' });
    formData.append(`tags[]`, JSON.stringify(values?.tags));
    formData.append('owner', user?.email || '62061a67e19d1168db64cca5');

    console.log(formData.get('image'));

    axios({
      method: 'POST',
      url: '/api/post/new',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((v) => {
        console.log(v);
        setState(v.data.image);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <NewPostForm onSubmit={handleFormSubmit}></NewPostForm>
      {state && (
        <Image
          layout="responsive"
          objectFit="scale-down"
          width={200}
          height={200}
          src={URL.createObjectURL(state)}
          alt={state.name}
          className="object-contain relative h-auto w-max"
        />
      )}
    </div>
  );
};

export default Home;
