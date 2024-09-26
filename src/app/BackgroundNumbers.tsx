import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundNumbersProps {
  darkMode: boolean;
}

const numbersArray = Array.from({ length: 50 }, () =>
  Math.floor(Math.random() * 100)
);

export default function BackgroundNumbers({ darkMode }: BackgroundNumbersProps) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Update window size on mount and resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {numbersArray.map((num, index) => {
        const size = Math.random() * 50 + 20; // Random size between 20px and 70px
        const startX = Math.random() * windowSize.width;
        const startY = Math.random() * windowSize.height;
        const duration = Math.random() * 20 + 10; // Duration between 10s and 30s

        return (
          <motion.span
            key={index}
            className="absolute select-none pointer-events-auto"
            style={{
              fontSize: `${size}px`,
              top: startY,
              left: startX,
              color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              userSelect: 'none',
            }}
            animate={{
              y: windowSize.height + 100,
              x: Math.random() * windowSize.width - startX,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            whileHover={{ scale: 0.5 }}
          >
            {num}
          </motion.span>
        );
      })}
    </>
  );
}
