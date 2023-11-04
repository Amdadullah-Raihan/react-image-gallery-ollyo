import React, { useEffect, useState } from "react";
import { useImages } from "../contexts/ImagesContext";
import { BsImage } from "react-icons/bs";
import { motion } from "framer-motion";
import useApiUrl from "../hooks/useApiUrl";
import AddImageBtn from "./AddImageBtn";
import Image from "next/image";

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
      whileHover={{ scale: 1.05, }}
      className={`
        image-item relative flex items-center justify-center bg-white rounded-lg border cursor-pointer overflow-hidden hover:shadow-md hover:cursor-move
      `}
      onClick={() => handleSelected(image._id)}
      onMouseEnter={() => setIsHovering(image._id)}
      onMouseLeave={() => setIsHovering(null)}
    >
      <img src={image.url} alt="" className="w-full h-full" />

      {/* Checkbox on hover or if selected */}
      <input
        type="checkbox"
        checked={selectedImages.includes(image._id)}
        className={`
          absolute
          top-4
          left-4
          z-10
          bg-gray-200
          checkbox ${
            selectedImages.includes(image._id) ||
            (isHovering === image._id && !selectedImages.includes(image._id))
              ? "block "
              : "hidden"
          }
        `}
      />
    </motion.div>
  );
};

export default ImageGrid;
