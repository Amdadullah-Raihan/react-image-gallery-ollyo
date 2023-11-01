'use client'
import React, { useEffect, useState } from 'react';
import imagesData from '../../public/images.json';
import { ToastContainer, toast } from 'react-toastify';
import AddImageModal from './AddImageModal';
import { BsImage } from 'react-icons/bs'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useApiUrl from '../hooks/useApiUrl';

const ImageGallery = () => {
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
   const [isHovering, setIsHovering] = useState(null);
   const apiUrl = useApiUrl();

  console.log('isHovering', isHovering);
  
  const handleSelected = (id) => {
    const isSelected = selectedImages.includes(id);

    if (isSelected) {
      // If image is already selected, remove it from the selectedImages array
      setSelectedImages(selectedImages.filter((imgId) => imgId !== id));
    } else {
      // If image is not selected, add it to the selectedImages array
      setSelectedImages([...selectedImages, id]);
    }
  };

    const handleDeleteSelected = () => {
      
    // Filter out the selected images from the images array
    const updatedImages = images.filter((image) => !selectedImages.includes(image._id));
    setImages(updatedImages)

    // Set the selectedImages array to an empty array
    setSelectedImages([]);
    toast.success("Deleted selected images")

  };

 useEffect(() => {
  axios.get(`${apiUrl}/api/v1/images`)
  .then((response) => {
    setImages(response.data);

    console.log('result', response);
  })
.catch((error) => {
    console.error('Error getting images:', error);
  });
}, []);


  return (
   <div className=' p-16 bg-base-300'>
    <div className='p-2 bg-white border-b mb-2 flex justify-between '> 
      <div className=' flex gap-2 font-bold'>
         <input type='checkbox' checked={selectedImages.length > 0 && 'checked'} className='checkbox'/> {selectedImages.length > 0 ? selectedImages.length : 'No'}  {selectedImages.length > 1 ? "Files" : 'File'}  Selected
      </div>
      <div>
          <button onClick={handleDeleteSelected} className='text-rose-400 font-bold disabled:text-rose-200' disabled={selectedImages.length < 1 && true}>Delete {selectedImages.length > 1 ? "Files" : 'File'}</button>
      </div>
    </div>

     <div 
     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4"
     
     >
      
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative p-4 bg-white rounded-lg shadow cursor-pointer ${
            index === 0 && 'row-span-2 col-span-2'
          } hover:bg-gray-300`}
          onClick={() => handleSelected(image._id)}
           onMouseEnter={() => setIsHovering(image._id)}
              onMouseLeave={() => setIsHovering(null)}
          
        >
        
  <input
  type="checkbox"
  checked={selectedImages.includes(image._id)}
  className={` absolute top-4 left-4 checkbox ${selectedImages.includes(image._id) || (isHovering === image._id && !selectedImages.includes(image._id)) ? 'block' : 'hidden'}`}
/>


          
        
          <img src={image.url} alt={image.alt} />
        </div>
        
      ))}
     <button className="flex flex-col justify-center items-center h-full w-full bg-white rounded-lg border border-2 border-dashed border-gray-400 text-gray-700 font-bold hover:bg-gray-200" onClick={() => document.getElementById('my_modal_3').showModal()}>
      <BsImage/>
  Add Image
</button>

    </div>
    <ToastContainer/>
    <AddImageModal/>
   </div>
  );
};

export default ImageGallery;

