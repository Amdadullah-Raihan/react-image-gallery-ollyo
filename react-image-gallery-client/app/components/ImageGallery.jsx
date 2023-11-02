"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddImageModal from "./AddImageModal";
import { BsImage } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useApiUrl from "../hooks/useApiUrl";
import { useImages } from "../contexts/ImagesContext";
import { motion } from "framer-motion";
import ImageItem from "./ImageGrid";
import AddImageBtn from "./AddImageBtn";
import Navbar from "./Navbar";
import { Oval } from "react-loader-spinner";

const ImageGallery = () => {
  const [alreadyFeatured, setAlreadyFeatured] = useState(false);
  const apiUrl = useApiUrl(false);
  const [
    images,
    setImages,
    selectedImages,
    setSelectedImages,
    isHovering,
    setIsHovering,
    isLoading,
  ] = useImages();

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

  const handleDeleteSelected = () => {
    const imageIdsToDelete = selectedImages;

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

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen  flex items-center justify-center">
          <Oval height="80" width="80" borderColor="black" barColor="gray" />
        </div>
      ) : (
        <div className="lg:m-16 bg-white  rounded-lg shadow overflow-hidden ">
          {/* Navbar  */}
          <Navbar
            selectedImages={selectedImages}
            handleMakeFeatured={handleMakeFeatured}
            handleDeleteSelected={handleDeleteSelected}
            alreadyFeatured={alreadyFeatured}
          />

          {/* Sigle Img */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-4 md:p-8">
            {images.map((image, index) => (
              <ImageItem
                key={index}
                image={image}
                handleSelected={handleSelected}
                selectedImages={selectedImages}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
              />
            ))}
            <AddImageBtn />
          </div>

          {/* These components will be triggered on specific events */}
          <ToastContainer />
          <AddImageModal />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
