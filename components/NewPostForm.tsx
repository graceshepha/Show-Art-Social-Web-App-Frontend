import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ImageUploaderField from './FormFields/ImageUploaderField';
import InputTextField from './FormFields/InputTextField';
import TextAreaField from './FormFields/TextAreaField';
import { useRouter } from 'next/router';

type FormValues = {
  title: string;
  image?: File;
  description: string;
  tags: string[];
};

type FormikHandleSubmit = (v: FormValues, h: FormikHelpers<FormValues>) => void;

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

interface Props extends Omit<FormProps, 'onSubmit'> {
  onSubmit: FormikHandleSubmit;
}

const TITLE = 'Create a new post';
const MAX_SIZE = 10; // IN MB
const FILE_SIZE = MAX_SIZE * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/gif', 'image/png'];

const NewPostForm: NextPage<Props> = ({ onSubmit, ...props }) => {
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      image: undefined,
      description: '',
      // visibility: 'public',
      tags: ['tag1'], // not important right now
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
    onSubmit: onSubmit,
  });

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>
          {!formik.isValid
            ? `(${Object.keys(formik.errors).length}) ${TITLE}`
            : TITLE}
        </title>
      </Head>
      <form {...props} onSubmit={formik.handleSubmit}>
        <InputTextField
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
          className="input input-bordered"
        >
          Title
        </InputTextField>
        <TextAreaField
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
          className="textarea textarea-bordered"
        >
          Description
        </TextAreaField>
        <ImageUploaderField
          name="image"
          value={formik.values.image}
          setValue={(v: File) => formik.setFieldValue('image', v)}
          error={formik.errors.image}
          accept={SUPPORTED_FORMATS.join()}
          maxSize={MAX_SIZE}
        />
        <div className="mt-2 p-2 space-x-2">
          <button type="submit" className="btn btn-accent">
            Add post
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
