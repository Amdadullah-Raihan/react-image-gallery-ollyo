import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="#14b8a6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#5eead4"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loading;
