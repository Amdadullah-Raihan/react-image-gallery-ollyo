import React, { useEffect, useState } from "react";
import { useImages } from "../contexts/ImagesContext";
import { BsImage } from "react-icons/bs";
import { motion } from "framer-motion";
import useApiUrl from "../hooks/useApiUrl";
import AddImageBtn from "./AddImageBtn";

const ImageGrid = ({
  image,
  handleSelected,
  selectedImages,
  setIsHovering,
  isHovering,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      className={`
        image-item relative flex items-center justify-center bg-white rounded-lg border cursor-pointer overflow-hidden hover:z-10 
        ${image.isFeatured && "row-span-2 col-span-2"}
      `}
      onClick={() => handleSelected(image._id)}
      onMouseEnter={() => setIsHovering(image._id)}
      onMouseLeave={() => setIsHovering(null)}
    >
      <img src={image.url} alt={image.alt} className="w-full h-full" />

      {/* Checkbox on hover or if selected */}
      <input
        type="checkbox"
        checked={selectedImages.includes(image._id)}
        className={`
          absolute
          top-4
          left-4
          z-10
          checkbox ${
            selectedImages.includes(image._id) ||
            (isHovering === image._id && !selectedImages.includes(image._id))
              ? "block"
              : "hidden"
          }
        `}
      />
    </motion.div>
  );
};

export default ImageGrid;
