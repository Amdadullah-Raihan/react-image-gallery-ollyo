import React from "react";
import { useImages } from "../contexts/ImagesContext";
import { FaTrash } from "react-icons/fa6";

const Navbar = ({
  selectedImages,
  handleMakeFeatured,
  handleDeleteSelected,
  alreadyFeatured,
  toggleSelectAll,
}) => {
  const [images] = useImages();
  return (
    <div className="px-4 lg:px-8 py-5 bg-white border-b flex justify-between  ">
      <div className="flex  items-center gap-1 sm:gap-2  font-bold">
        <input
          type="checkbox"
          checked={selectedImages.length > 0 && "checked"}
          className="checkbox"
          onChange={toggleSelectAll}
        />
        {selectedImages.length > 0
          ? selectedImages.length === images.length
            ? "All"
            : selectedImages.length
          : "No"}{" "}
        {selectedImages.length > 1 ? "Files" : "File"}{" "}
        <span className="hidden sm:block">Selected</span>
      </div>

      <div>
        {selectedImages.length === 1 && !alreadyFeatured && (
          <button
            className="btn btn-xs sm:btn-sm text-green-500"
            onClick={() => handleMakeFeatured("")}
          >
            Make Featured
          </button>
        )}
      </div>

      <div
        className="tooltip  tooltip-left"
        data-tip={
          selectedImages.length < 1
            ? "Select at Least 1 File"
            : "Delete Selected"
        }
      >
        <button
          onClick={handleDeleteSelected}
          className="border border-rose-500  px-4 py-1 rounded-md ml-12 sm:ml-0 text-rose-400 font-bold disabled:text-rose-200 disabled:border-rose-200"
          disabled={selectedImages.length < 1 && true}
          title="Delete Selected"
        >
          <FaTrash className="text-xl" />
          {/* Delete {selectedImages.length > 1 ? "Files" : "File"} */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
