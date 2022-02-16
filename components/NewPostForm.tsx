import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploader from './ImageUploader';
import TextField from './TextField';

type NewPostFormProps = React.FormHTMLAttributes<HTMLFormElement>;

const TITLE = 'Create a new post';
const FILE_SIZE = 16 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const NewPostForm: NextPage<NewPostFormProps> = ({ ...props }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      image: undefined,
      description: '',
      // visibility: 'public',
      tags: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required('Title is required')
        .trim()
        .min(6, 'Title cannot be too short'),
      image: Yup.mixed()
        .required('A file is required')
        .test(
          'fileSize',
          'File too large',
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
      description: Yup.string().notRequired().trim(),
      tags: Yup.array(Yup.string()).min(1),
    }),
    onSubmit: (v) => {
      setSubmitted(true);
      console.log('SUCCESS', v);
    },
  });
  return (
    <>
      <Head>
        <title>
          {!formik.isValid
            ? `${Object.keys(formik.errors).length} - ${TITLE}`
            : TITLE}
        </title>
      </Head>
      <form {...props} onSubmit={formik.handleSubmit}>
        <ImageUploader
          name="image"
          value={formik.values.image}
          setValue={(v: File) => formik.setFieldValue('image', v)}
          error={(formik.dirty && formik.errors.image) || ''}
        />
        <button type="submit">ok</button>
      </form>
    </>
  );
};

export default NewPostForm;
