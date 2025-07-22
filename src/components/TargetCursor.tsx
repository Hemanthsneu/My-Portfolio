import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = "*",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useRef<boolean>(false);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    []
  );

  // Detect if device is mobile
  const detectMobile = useCallback(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    
    return isMobileDevice || isTouch || isSmallScreen;
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current || isMobile.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Check if mobile
    isMobile.current = detectMobile();
    
    // Don't initialize cursor on mobile devices
    if (isMobile.current) {
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
      return;
    }

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      ".target-cursor-corner"
    );

    let activeTarget: Element | null = null;
    let currentTargetMove: ((ev: Event) => void) | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
        target.removeEventListener("touchmove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
        target.removeEventListener("touchend", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    // Very minimal exclusions
    const excludedElements = [
      'html', 'body', 'head', 'script', 'style', 'link', 'meta', 'title', 'noscript'
    ];

    // Much more permissive validation - almost everything should be targetable
    const isValidTarget = (element: Element): boolean => {
      const tagName = element.tagName.toLowerCase();
      
      // Only exclude very specific non-interactive elements
      if (excludedElements.includes(tagName)) return false;
      
      // Exclude elements with no-target-cursor class
      if (element.classList.contains('no-target-cursor')) return false;
      
      // Exclude elements that are parents of no-target-cursor elements
      if (element.querySelector('.no-target-cursor')) return false;
      
      // Check if element is inside skills or experience section - if so, be super permissive
      const isInSkillsOrExperience = element.closest('#skills, #experience') !== null;
      
      if (isInSkillsOrExperience) {
        // For skills/experience sections, only exclude completely hidden elements
        const styles = window.getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
      }
      
      // For other sections, use more restrictive validation
      const styles = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      // Very small size check - only exclude tiny elements
      if (rect.width < 5 || rect.height < 5) return false;
      
      // Exclude completely hidden elements
      if (styles.visibility === 'hidden' || styles.display === 'none') return false;
      
      // Only exclude if explicitly set to none and not in skills/experience
      if (styles.pointerEvents === 'none') return false;
      
      // Check inline style as well
      const htmlElement = element as HTMLElement;
      if (htmlElement.style && htmlElement.style.pointerEvents === 'none') return false;
      
      // Exclude completely transparent elements
      if (styles.opacity === '0') return false;
      
      return true;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    // Handle both mouse and touch events
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if (e instanceof TouchEvent) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      moveCursor(clientX, clientY);
    };

    window.addEventListener("mousemove", moveHandler as EventListener);

    const enterHandler = (e: MouseEvent | TouchEvent) => {
      let target;
      if (e instanceof TouchEvent) {
        if (e.touches.length > 0) {
          target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        } else {
          return;
        }
      } else {
        target = e.target as Element;
      }

      if (!target) return;

      const allTargets: Element[] = [];
      let current = target;
      while (current && current !== document.body) {
        // Target everything, then validate
        const isValid = isValidTarget(current);
        if (isValid) {
          allTargets.push(current);
        }
        current = current.parentElement!;
      }

      const targetElement = allTargets[0] || null;
      if (!targetElement || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === targetElement) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = targetElement;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = targetElement.getBoundingClientRect();
        const cursorRect = cursorRef.current!.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let tlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;
      const targetMove = (ev: Event) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          let clientX, clientY;
          if (ev instanceof TouchEvent) {
            if (ev.touches.length > 0) {
              clientX = ev.touches[0].clientX;
              clientY = ev.touches[0].clientY;
            } else {
              moveThrottle = null;
              return;
            }
          } else {
            const mouseEvent = ev as MouseEvent;
            clientX = mouseEvent.clientX;
            clientY = mouseEvent.clientY;
          }
          updateCorners(clientX, clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            ) as number;
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(targetElement);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      // Add both mouse and touch events
      targetElement.addEventListener("mousemove", targetMove);
      targetElement.addEventListener("touchmove", targetMove, { passive: true });
      targetElement.addEventListener("mouseleave", leaveHandler);
      targetElement.addEventListener("touchend", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler as EventListener, { passive: true });

    // Handle orientation change
    const handleOrientationChange = () => {
      isMobile.current = detectMobile();
      if (isMobile.current && cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener("mousemove", moveHandler as EventListener);
      window.removeEventListener("mouseover", enterHandler as EventListener);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, detectMobile]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current || isMobile.current) return;
    
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div 
      ref={cursorRef} 
      className={`fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 ${isMobile.current ? 'hidden' : 'block'}`}
      style={{ willChange: 'transform' }}
    >
      <div 
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-gold rounded-full transform -translate-x-1/2 -translate-y-1/2" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-gold transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-gold transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-gold transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-gold transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0" 
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default TargetCursor; 