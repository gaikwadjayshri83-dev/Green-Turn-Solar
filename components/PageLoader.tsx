
import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 250px)' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
};

export default PageLoader;
