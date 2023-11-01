'use client'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AddImageModal from './AddImageModal';
import { BsImage } from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useApiUrl from '../hooks/useApiUrl';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isHovering, setIsHovering] = useState(null);
  const apiUrl = useApiUrl();

  console.log('isHovering', isHovering);

  const handleSelected = (id) => {
    const isSelected = selectedImages.includes(id);

    if (isSelected) {
      // If the image is already selected, remove it from the selectedImages array
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      // If the image is not selected, add it to the selectedImages array
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleDeleteSelected = () => {
    // Filter out the selected images from the images array
    const updatedImages = images.filter((image) => !selectedImages.includes(image._id));
    setImages(updatedImages);

    // Set the selectedImages array to an empty array
    setSelectedImages([]);
    toast.success('Deleted selected images');
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/images`)
      .then((response) => {
        const sortedImages = response.data.sort((a, b) => {
          // Move featured images to the beginning
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        setImages(sortedImages);

        console.log('result', response);
      })
      .catch((error) => {
        console.error('Error getting images:', error);
      });
  }, [apiUrl]);

  return (
    <div className="m-16 bg-white rounded-lg shadow">
      <div className="px-8 py-4 bg-white border-b 2 flex justify-between">
        <div className="flex gap-2 font-bold">
          <input
            type="checkbox"
            checked={selectedImages.length > 0 && 'checked'}
            className="checkbox"
          />{' '}
          {selectedImages.length > 0 ? selectedImages.length : 'No'}{' '}
          {selectedImages.length > 1 ? 'Files' : 'File'} Selected
        </div>
        <div>
          <button
            onClick={handleDeleteSelected}
            className="text-rose-400 font-bold disabled:text-rose-200"
            disabled={selectedImages.length < 1 && true}
          >
            Delete {selectedImages.length > 1 ? 'Files' : 'File'}
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-8"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative p-4 bg-white rounded-lg border cursor-pointer ${
              image.isFeatured && 'row-span-2 col-span-2'
            } hover:bg-gray-300`}
            onClick={() => handleSelected(image._id)}
            onMouseEnter={() => setIsHovering(image._id)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <input
              type="checkbox"
              checked={selectedImages.includes(image._id)}
              className={`absolute top-4 left-4 checkbox ${
                selectedImages.includes(image._id) ||
                (isHovering === image._id && !selectedImages.includes(image._id))
                  ? 'block'
                  : 'hidden'
              }`}
            />

            <img src={image.url} alt={image.alt} className='' />
          </div>
        ))}
        <button
          className="flex flex-col justify-center items-center h-full w-full min-h-[250px] bg-white rounded-lg border border-2 border-dashed border-gray-400 text-gray-700 font-bold hover:bg-gray-200"
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          <BsImage />
          Add Image
        </button>
      </div>
      <ToastContainer />
      <AddImageModal />
    </div>
  );
};

export default ImageGallery;
