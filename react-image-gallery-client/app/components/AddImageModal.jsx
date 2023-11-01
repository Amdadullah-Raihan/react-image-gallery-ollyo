'use client'
import React, { useState } from 'react'
import useApiUrl from '../hooks/useApiUrl';
import { ToastContainer, toast } from 'react-toastify';
import { RiImageAddLine } from 'react-icons/ri'
import axios from 'axios';

const AddImageModal = () => {
    const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const apiUrl = useApiUrl();
  console.log('apiUrl: ' + apiUrl);

  
const handleAddImage = () => {
  const newImage = {
    url: imageUrl,
    isFeatured: isFeatured,
  };

 
  axios.post(`${apiUrl}/api/v1/images/new`, newImage)
    .then((response) => {
   
      console.log('Image added:', response.data);
      toast.success("Image added successfully")

      // Clear the form inputs
      setImageUrl('');
      setIsFeatured(false);

    })
    .catch((error) => {
      console.error('Error adding image:', error);
      // Handle the error if needed
    });
};


  return (
    <div>
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
    
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div className='grid grid-cols-1 gap-4'>
      <h2 className='uppercase font-bold mb-4'>Add New Image</h2>
      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        className='input input-bordered'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <label className='flex gap-2'>
        <input
          type="checkbox"
          className='checkbox'
          checked={isFeatured}
          onChange={() => setIsFeatured(!isFeatured)}
        />
        Featured Image
      </label>
    </div>
      <div className="w-full text-right mt-4 ">
        <button className='btn btn-neutral ' onClick={handleAddImage}>
           <RiImageAddLine className='text-lg'/>
            Add Image
            </button>
      </div>
  </div>
</dialog>
<ToastContainer/>
    </div>
  )
}

export default AddImageModal
