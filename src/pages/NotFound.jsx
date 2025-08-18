import React from "react";

const NotFound = ({onPageReload}) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="text-center">
        <img
          src="../no_data.jpg"
          alt="No data found"
          className="h-[200px] w-[200px] mb-5 rounded-full"
        />
        <div className="text-3xl text-template-1 mb-8">Data not found</div>
        <button
          className="h-8 w-20 rounded-md border text-blue hover:bg-blue-100 self-center"
          onClick={onPageReload}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default NotFound;
