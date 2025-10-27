import React from 'react';

interface StarIconProps {
  fill: 'full' | 'half' | 'empty';
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ fill, className = 'w-5 h-5' }) => {
  if (fill === 'half') {
    return (
      <svg className={`${className} text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="currentColor" className="text-gray-300" />
      </svg>
    );
  }

  return (
    <svg 
      className={`${className} ${fill === 'full' ? 'text-yellow-400' : 'text-gray-300'}`} 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default StarIcon;
