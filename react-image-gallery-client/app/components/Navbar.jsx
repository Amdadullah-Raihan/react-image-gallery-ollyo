import React from "react";
import { useImages } from "../contexts/ImagesContext";
const Navbar = ({
  selectedImages,
  handleMakeFeatured,
  handleDeleteSelected,
  alreadyFeatured,
  toggleSelectAll,
}) => {
  const [images] = useImages();
  return (
    <div className="px-8 py-4 bg-white border-b flex justify-between h-16">
      <div className="flex items-center gap-x-2 font-bold">
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
        {selectedImages.length > 1 ? "Files" : "File"} Selected
      </div>
      {selectedImages.length === 1 && !alreadyFeatured && (
        <button
          className="btn btn-sm text-green-500"
          onClick={() => handleMakeFeatured("")}
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
  );
};

export default Navbar;
