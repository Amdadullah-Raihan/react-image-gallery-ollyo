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
  const [validUrl, setValidUrl] = useState(false);
  const apiUrl = useApiUrl();

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setValidUrl(isValidURL(e.target.value));
  };
  const isValidURL = (url) => {
    const urlPattern = /^(https?|ftp?|http):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  };

  const handleIsFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  const handleAddImage = async () => {
    try {
      if (!imageUrl) {
        toast.error("Please provide an Image URL");
        return;
      }

      const newImage = {
        url: imageUrl,
        isFeatured: isFeatured,
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/images/new`,
        newImage
      );

      toast.success("Image added successfully");

      // Get the previously featured image
      const previouslyFeaturedImage = images.find((image) => image.isFeatured);

      // Update the images state
      let updatedImages;

      if (isFeatured) {
        // If the new image is featured, place it at the beginning of the array
        updatedImages = [
          response.data,
          ...images.filter((image) => image._id !== response.data._id),
        ];
      } else {
        // If the new image is not featured, add it to the end of the array
        updatedImages = [
          ...images.filter((image) => image._id !== response.data._id),
          response.data,
        ];
      }

      // If there was a previously featured image, set its isFeatured to false
      if (previouslyFeaturedImage) {
        const index = updatedImages.findIndex(
          (image) => image._id === previouslyFeaturedImage._id
        );
        if (index !== -1) {
          updatedImages[index].isFeatured = false;
        }
      }

      setImages(updatedImages);
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
            <button
              className="btn btn-neutral "
              onClick={handleAddImage}
              disabled={!validUrl}
            >
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
