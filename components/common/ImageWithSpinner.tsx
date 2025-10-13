import React, { useState } from 'react';
import Spinner from './Spinner';

interface ImageWithSpinnerProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
}

const ImageWithSpinner: React.FC<ImageWithSpinnerProps> = ({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner className="h-8 w-8 text-green-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${imageClassName}`}
        onLoad={() => setIsLoading(false)}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default ImageWithSpinner;
