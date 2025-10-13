import React from 'react';
import { m, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, el = 'h2', className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        ease: "easeOut",
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
      rotate: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a fluid effect
      },
    },
  };

  const HeadingTag = m[el];

  return (
    <HeadingTag
      ref={ref}
      className={`${className} overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <m.span
          key={index}
          className="inline-block"
          style={{ paddingRight: '0.25em' }}
          variants={wordVariants}
        >
          {word}
        </m.span>
      ))}
    </HeadingTag>
  );
};

export default AnimatedHeading;