import { useUpload } from '@/services/upload';
import { Plus } from 'lucide-react';
import * as React from "react";
import { useState } from 'react';

export interface ImageUploadInputProps {
  onUpload?: (path: string) => void;
}

const ImageUploadInput = ({ onUpload }: ImageUploadInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { mutateAsync } = useUpload();

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    mutateAsync(formData).then(data => {
      onUpload?.(data.file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 w-60 h-60 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
        {preview ? (
          <label htmlFor="imageInput" className="flex flex-col items-center text-gray-500 justify-center text-center">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg max-h-[80%]" />
          </label>
        ) : (
          <label htmlFor="imageInput" className="flex flex-col items-center text-gray-500 text-center">
            <Plus className="h-14 w-14" />
            <p>Clique para fazer upload de imagem</p>
          </label>
        )}
        <input
          id="imageInput"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}


export default ImageUploadInput;
