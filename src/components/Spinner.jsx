import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
