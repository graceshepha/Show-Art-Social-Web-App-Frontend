import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

type ImageUploaderProps = {
  className?: string;
  error?: string;
  value?: File;
  name?: string;
  setValue: (v: File) => void;
};

const ImageUploader: NextPage<ImageUploaderProps> = ({
  value,
  name,
  setValue,
  ...props
}) => {
  const onDropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.items
      ? e.dataTransfer.items
      : e.dataTransfer.files;
    if (files instanceof DataTransferItemList && files.length > 0) {
      const f = files[0].getAsFile();
      if (f) setValue(f);
    } else if (files instanceof FileList) {
      setValue(files[0]);
    }
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const files = e.target.files;
    if (files) {
      setValue(files[0]);
    }
  };

  return (
    <div
      onDrop={onDropHandler}
      onDragOver={(e) => e.preventDefault()}
      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
    >
      <div className="space-y-1 text-center">
        <div className="pb-3">
          {!value ? (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <div className="image-container">
              <Image
                layout="responsive"
                objectFit="scale-down"
                width={200}
                height={200}
                src={URL.createObjectURL(value)}
                alt={value.name}
                className="object-contain relative h-auto w-max"
              />
            </div>
          )}
        </div>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name={name}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangeHandler}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <p className="label-text-alt text-error">{props.error}</p>
      </div>
    </div>
  );
};

export default ImageUploader;
