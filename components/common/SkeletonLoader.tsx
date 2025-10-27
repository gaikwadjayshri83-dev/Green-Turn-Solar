import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-4 rounded-md border animate-pulse">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonLoader;
