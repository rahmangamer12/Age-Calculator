'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundNumbersProps {
  darkMode: boolean;
}

export default function BackgroundNumbers({ darkMode }: BackgroundNumbersProps) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [numbersArray, setNumbersArray] = useState<number[]>([]);

  useEffect(() => {
    // Generate the numbersArray only on the client
    const nums = Array.from({ length: 50 }, () =>
      Math.floor(Math.random() * 100)
    );
    setNumbersArray(nums);
  }, []);

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

  // Wait until the numbersArray is populated
  if (numbersArray.length === 0 || windowSize.width === 0) {
    return null; // Render nothing during SSR and until the numbers are generated
  }

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
              color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)',
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
