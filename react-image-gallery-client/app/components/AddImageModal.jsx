"use client";
import React, { useState } from "react";
import useApiUrl from "../hooks/useApiUrl";
import { ToastContainer, toast } from "react-toastify";
import { RiImageAddLine } from "react-icons/ri";
import axios from "axios";
import { useImages } from "../contexts/ImagesContext";

const AddImageModal = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useImages();
  const apiUrl = useApiUrl();

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleIsFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  const handleAddImage = async () => {
    try {
      const newImage = {
        url: imageUrl,
        isFeatured: isFeatured,
      };

      if (isFeatured) {
      }

      const response = await axios.post(
        `${apiUrl}/api/v1/images/new`,
        newImage
      );

      toast.success("Image added successfully");

      setImages((prevImages) => [...prevImages, response.data]);

      clearForm();
    } catch (error) {
      console.error("Error adding image:", error.message);
      toast.error("Error adding image");
      // Handle the error if needed
    }
  };

  const clearForm = () => {
    setImageUrl("");
    setIsFeatured(false);
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-1 gap-4">
            <h2 className="uppercase font-bold mb-4">Add New Image</h2>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              className="input input-bordered"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
            />
            <label className="flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={isFeatured}
                onChange={handleIsFeaturedChange}
              />
              Featured Image
            </label>
          </div>
          <div className="w-full text-right mt-4 ">
            <button className="btn btn-neutral " onClick={handleAddImage}>
              <RiImageAddLine className="text-lg" />
              Add Image
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default AddImageModal;
