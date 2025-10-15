import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger loading when the element is intersecting the viewport
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stop observing once it's in view
          observer.unobserve(entry.target);
        }
      },
      {
        // Load the image 200px before it enters the viewport for a smoother experience
        rootMargin: '200px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full bg-gray-100 overflow-hidden ${containerClassName}`}>
      {/* Only render the image tag when it's in the viewport to trigger loading */}
      {isInView && (
        <>
          {/* Show a spinner overlay while the image is loading */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner className="h-8 w-8 text-green-600" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            // Use native lazy loading as a progressive enhancement
            loading="lazy"
            className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
            onLoad={() => setIsLoaded(true)}
            style={{ objectFit: 'cover' }}
          />
        </>
      )}
    </div>
  );
};

export default ImageWithSpinner;
