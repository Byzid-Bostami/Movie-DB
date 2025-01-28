import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 animate-spin border-t-blue-500"></div>
    </div>
  );
};

export default Loading;