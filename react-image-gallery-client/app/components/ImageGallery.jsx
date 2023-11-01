"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddImageModal from "./AddImageModal";
import { BsImage } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useApiUrl from "../hooks/useApiUrl";
import { useImages } from "../contexts/ImagesContext";

const ImageGallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isHovering, setIsHovering] = useState(null);
  const [alreadyFeatured, setAlreadyFeatured] = useState(false);
  const [images, setImages] = useImages();
  const apiUrl = useApiUrl();

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
    // Create an array of image IDs to delete
    const imageIdsToDelete = selectedImages;

    // Send a POST request to delete one or multiple images
    axios
      .post(`${apiUrl}/api/v1/images/delete`, { imageIds: imageIdsToDelete })
      .then((response) => {
        if (response.data.success) {
          // Filter out the selected images from the images array
          const updatedImages = images.filter(
            (image) => !selectedImages.includes(image._id)
          );
          setImages(updatedImages);
          setSelectedImages([]);
          toast.success("Deleted selected images");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting images:", error);
        // Handle the error if needed
      });
  };

  const handleMakeFeatured = () => {
    // Ensure that only one image is selected
    if (selectedImages.length === 1) {
      // Send a PUT request to update the image as featured
      const imageId = selectedImages[0];

      axios
        .put(`${apiUrl}/api/v1/images/${imageId}/make-featured`)
        .then((response) => {
          // Update the images state by replacing the updated image
          const updatedImages = images.map((image) => {
            if (image._id === imageId) {
              return { ...image, isFeatured: true };
            } else if (image.isFeatured) {
              return { ...image, isFeatured: false };
            }
            return image;
          });

          // If there was no previously featured image or if the selected image was not the featured one
          if (
            !images.some((image) => image.isFeatured) ||
            !images.find((image) => image._id === imageId).isFeatured
          ) {
            // Move the featured image to the first position in the array
            const firstFeatured = updatedImages.findIndex(
              (image) => image.isFeatured
            );
            if (firstFeatured !== -1) {
              const featuredImage = updatedImages.splice(firstFeatured, 1)[0];
              updatedImages.unshift(featuredImage);
            }
          }

          setImages(updatedImages);
          setSelectedImages([]);

          toast.success("Image set as featured");
        })
        .catch((error) => {
          console.error("Error making the image featured:", error);
          // Handle the error if needed
        });
    }
  };

  useEffect(() => {
    if (selectedImages.length === 1) {
      const img = images.filter((img) => img._id === selectedImages[0]);

      if (img[0].isFeatured) {
        setAlreadyFeatured(true);
      } else {
        setAlreadyFeatured(false);
      }
    }
  }, [selectedImages]);

  return (
    <div className="m-16 bg-white rounded-lg shadow overflow-hidden">
      <div className="px-8 py-4 bg-white  border-b 2 flex justify-between">
        <div className="flex items-center gap-2 font-bold">
          <input
            type="checkbox"
            checked={selectedImages.length > 0 && "checked"}
            className="checkbox"
          />
          {selectedImages.length > 0 ? selectedImages.length : "No"}{" "}
          {selectedImages.length > 1 ? "Files" : "File"} Selected
        </div>

        {selectedImages.length === 1 && !alreadyFeatured && (
          <button
            className="btn btn-sm text-green-500"
            onClick={handleMakeFeatured}
          >
            Make Featured
          </button>
        )}
        <div>
          <button
            onClick={handleDeleteSelected}
            className="text-rose-400 font-bold disabled:text-rose-200"
            disabled={selectedImages.length < 1 && true}
          >
            Delete {selectedImages.length > 1 ? "Files" : "File"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative p-4 bg-white rounded-lg border cursor-pointer ${
              image.isFeatured &&
              "row-span-2 col-span-2 min-h-[500px] bg-orange-100"
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
                (isHovering === image._id &&
                  !selectedImages.includes(image._id))
                  ? "block"
                  : "hidden"
              }`}
            />

            <img src={image.url} alt={image.alt} className="w-full  " />
          </div>
        ))}
        <button
          className="flex flex-col justify-center items-center h-full w-full min-h-[250px] bg-white rounded-lg border border-2 border-dashed border-gray-400 text-gray-700 font-bold hover:bg-gray-200"
          onClick={() => document.getElementById("my_modal_3").showModal()}
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
