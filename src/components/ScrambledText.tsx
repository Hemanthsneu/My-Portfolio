import React, { useEffect, useRef, useState } from "react";

// Enhanced fallback version that mimics GSAP premium SplitText + ScrambleTextPlugin
// For production use with premium features, purchase GSAP license: https://greensock.com/

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 0.6,
  speed = 0.8,
  scrambleChars = ".:01",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouch = 'ontouchstart' in window;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const textElement = rootRef.current.querySelector("p");
    if (!textElement) return;

    // Enhanced text splitting that mimics SplitText premium plugin
    const text = textElement.textContent || "";
    const chars: HTMLElement[] = [];
    
    textElement.innerHTML = "";
    
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "inline-block will-change-transform";
      span.dataset.content = char;
      span.dataset.index = index.toString();
      
      // Preserve spaces with proper spacing
      if (char === " ") {
        span.innerHTML = "&nbsp;";
      }
      
      textElement.appendChild(span);
      chars.push(span);
    });

    charsRef.current = chars;

    // Enhanced scramble animation that mimics ScrambleTextPlugin
    const scrambleChar = (element: HTMLElement, originalChar: string, distance: number) => {
      const scrambleDuration = duration * (1 - distance / radius);
      const scrambleFrames = Math.max(3, Math.floor(scrambleDuration * 30)); // 30fps equivalent
      let frame = 0;
      
      // Don't scramble spaces
      if (originalChar === " " || originalChar === "\u00A0") {
        return;
      }
      
      const animate = () => {
        if (frame < scrambleFrames) {
          const progress = frame / scrambleFrames;
          
          // Higher chance of showing correct character as we progress
          if (Math.random() < progress * 0.3) {
            element.textContent = originalChar;
          } else {
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            element.textContent = randomChar;
          }
          
          frame++;
          setTimeout(animate, Math.max(20, 100 - (progress * 80))); // Speed up over time
        } else {
          element.textContent = originalChar;
        }
      };
      
      animate();
    };

    // Handle both mouse and touch events
    const handleMove = (e: PointerEvent | TouchEvent) => {
      let clientX: number, clientY: number;
      
      if (e instanceof TouchEvent) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      charsRef.current.forEach((el) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const dx = clientX - (left + width / 2);
        const dy = clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const originalChar = el.dataset.content || "";
          
          // Add slight delay based on character index for wave effect
          const delay = parseInt(el.dataset.index || "0") * 0.02;
          
          setTimeout(() => {
            scrambleChar(el, originalChar, dist);
          }, delay * 1000);
        }
      });
    };

    const el = rootRef.current;
    
    // Add both pointer and touch events for better mobile compatibility
    el.addEventListener("pointermove", handleMove, { passive: true });
    
    // For mobile devices, also add touch events
    if (isMobile) {
      el.addEventListener("touchmove", handleMove as EventListener, { passive: true });
      el.addEventListener("touchstart", handleMove as EventListener, { passive: true });
    }

    return () => {
      el.removeEventListener("pointermove", handleMove);
      if (isMobile) {
        el.removeEventListener("touchmove", handleMove as EventListener);
        el.removeEventListener("touchstart", handleMove as EventListener);
      }
    };
  }, [radius, duration, speed, scrambleChars, isMobile]);

  return (
    <div
      ref={rootRef}
      className={`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white touch-manipulation ${className}`}
      style={{
        ...style,
        touchAction: 'manipulation'
      }}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText; 