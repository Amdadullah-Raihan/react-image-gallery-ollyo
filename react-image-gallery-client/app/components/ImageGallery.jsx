'use client'
import React, { useEffect, useState } from 'react';
import imagesData from '../../public/images.json';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const ImageGallery = () => {
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
   const [isHovering, setIsHovering] = useState(null);

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
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages)

    // Set the selectedImages array to an empty array
    setSelectedImages([]);
    toast.success("Deleted selected images")

  };

 useEffect(() => {
  // Sort the images array so that featured images appear first
  const sortedImages = [...imagesData].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1; // 'a' comes before 'b'
    if (!a.isFeatured && b.isFeatured) return 1;  // 'b' comes before 'a'
    return 0;  // No change in order
  });

  setImages(sortedImages);
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
          } hover:bg-gray-100`}
          onClick={() => handleSelected(image.id)}
           onMouseEnter={() => setIsHovering(image.id)}
              onMouseLeave={() => setIsHovering(null)}
          
        >
        
  <input
  type="checkbox"
  checked={selectedImages.includes(image.id)}
  className={` absolute top-4 left-4 checkbox ${selectedImages.includes(image.id) || (isHovering === image.id && !selectedImages.includes(image.id)) ? 'block' : 'hidden'}`}
/>


          
        
          <img src={image.src} alt={image.alt} />
        </div>
        
      ))}
      <button className='bg-white rounded-lg shadow'> Add Image</button>
    </div>
    <ToastContainer/>
   </div>
  );
};

export default ImageGallery;

