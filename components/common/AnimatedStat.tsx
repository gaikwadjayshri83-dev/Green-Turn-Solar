import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedStatProps {
  finalValue: number;
  isFloat?: boolean;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ finalValue, isFloat = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, finalValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            if (isFloat) {
              ref.current.textContent = value.toFixed(1);
            } else {
              ref.current.textContent = Math.round(value).toLocaleString('en-IN');
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, finalValue, isFloat]);

  return <span ref={ref}>{isFloat ? '0.0' : '0'}</span>;
};

export default AnimatedStat;
