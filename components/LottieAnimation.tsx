import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationPath, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath,
      });

      return () => anim.destroy(); // Cleanup on unmount
    }
  }, [animationPath]);

  return <div ref={containerRef} className={className} />;
};

export default LottieAnimation;