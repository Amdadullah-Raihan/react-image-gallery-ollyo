import React from "react";
import { BsImage } from "react-icons/bs";

const AddImageBtn = () => {
  return (
    <button
      className={`
        flex
        flex-col
        justify-center
        items-center
        h-full
        w-full
        min-h-[215px]
        bg-white
        rounded-lg
        border-2
        border-dashed
        border-gray-400
        text-gray-700
        font-bold
        hover:bg-gray-200
      `}
      onClick={() => document.getElementById("my_modal_3").showModal()}
    >
      {/* Btn's content */}
      <BsImage />
      Add Image
    </button>
  );
};

export default AddImageBtn;
