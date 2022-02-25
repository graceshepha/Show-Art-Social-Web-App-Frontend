import axios from 'axios';
import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import NewPostForm, { FormikHandleSubmit } from '@/NewPostForm';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <div> Loading ... </div>;

  const handleFormSubmit: FormikHandleSubmit = async (values, helpers) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);
    else helpers.setErrors({ image: 'Missing image' });
    formData.append(`tags[]`, JSON.stringify(values?.tags));

    console.debug(formData.get('image'));
    try {
      const req = await axios({
        method: 'POST',
        url: '/api/posts',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.debug(req);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <NewPostForm onSubmit={handleFormSubmit}></NewPostForm>
    </div>
  );
};

export default Home;
