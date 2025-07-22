import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouch = 'ontouchstart' in window;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || isTouch || isSmallScreen);
    };

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();
    
    window.addEventListener('resize', checkMobile);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  const floatingSymbols = [
    { size: 'text-4xl', position: { top: '10%', left: '5%' }, delay: 0, duration: 6 },
    { size: 'text-2xl', position: { top: '20%', right: '10%' }, delay: 0.5, duration: 8 },
    { size: 'text-3xl', position: { bottom: '30%', left: '8%' }, delay: 1, duration: 7 },
    { size: 'text-5xl', position: { top: '50%', right: '5%' }, delay: 1.5, duration: 9 },
    { size: 'text-2xl', position: { bottom: '10%', right: '15%' }, delay: 2, duration: 6 },
    { size: 'text-3xl', position: { top: '70%', left: '12%' }, delay: 2.5, duration: 8 },
  ];

  // Reduce number of symbols on mobile
  const symbolsToShow = isMobile ? floatingSymbols.slice(0, 3) : floatingSymbols;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Floating Symbols */}
      {!isReducedMotion && (
        <div className="absolute inset-0">
          {symbolsToShow.map((symbol, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                scale: [0.8, 1, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: symbol.duration,
                repeat: Infinity,
                delay: symbol.delay,
                ease: "easeInOut"
              }}
              className={`absolute ${symbol.size} text-gold`}
              style={symbol.position}
            >
              ✦
            </motion.div>
          ))}
        </div>
      )}

      {/* Subtle geometric shapes */}
      {!isReducedMotion && !isMobile && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-gold/10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  );
};

export default FloatingElements; 