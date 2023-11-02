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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ImageGallery = () => {
  const [alreadyFeatured, setAlreadyFeatured] = useState(false);
  const [isSelectedAll, setSelectedAll] = useState(false);
  const apiUrl = useApiUrl(false);
  const [
    images,
    setImages,
    selectedImages,
    setSelectedImages,
    isHovering,
    setIsHovering,
    isLoading,
    sorting,
    setSorting,
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

  // Function to toggle "Select All"
  const toggleSelectAll = () => {
    const allImageIds = images.map((image) => image._id);
    const updatedSelectedImages = isSelectedAll ? [] : allImageIds;
    setSelectedImages(updatedSelectedImages);
    setSelectedAll(!isSelectedAll);
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

  const handleMakeFeatured = (imgId) => {
    // Ensure that only one image is selected
    if (selectedImages.length === 1 || imgId) {
      let imageId;
      if (imgId) {
        imageId = imgId;
      } else {
        imageId = selectedImages[0];
      }

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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // No change in position
    }
    // combining item
    if (result.combine) {
      // super simple: just removing the dragging item
      const items = [...items];
      items.splice(result.source.index, 1);
      setImages({ items });
      return;
    }
    const reorderedItems = [...images];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    reorderedItems.forEach((item, index) => {
      item.position = index;
    });

    setImages(reorderedItems);
    setSelectedImages(result.draggableId);

    if (result.destination.index === 0) {
      handleMakeFeatured(result.draggableId);
      setSelectedImages([]);
    } else {
      setSelectedImages([]);
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
            toggleSelectAll={toggleSelectAll}
            handleMakeFeatured={handleMakeFeatured}
            handleDeleteSelected={handleDeleteSelected}
            alreadyFeatured={alreadyFeatured}
          />

          {/* Images Grids */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 p-4 md:p-8"
                >
                  {images.map((image, index) => (
                    <Draggable
                      key={image._id}
                      index={index}
                      draggableId={image._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            image.isFeatured && "row-span-2 col-span-2"
                          }
                        >
                          <ImageItem
                            index={index}
                            image={image}
                            handleSelected={handleSelected}
                            selectedImages={selectedImages}
                            isHovering={isHovering}
                            setIsHovering={setIsHovering}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <AddImageBtn />
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* sorting */}
          <div className="absolute top-12 lg:top-4  right-2 lg:right-4  z-10">
            <select
              className="select select-bordered w-full select-xs max-w-xs"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option disabled selected>
                Sort by date
              </option>
              <option value={1}>Ascending </option>
              <option value={-1}>Descending</option>
            </select>
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
