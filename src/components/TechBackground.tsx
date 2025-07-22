import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TechBackgroundProps {
  variant?: 'particles' | 'grid' | 'waves' | 'neural';
  intensity?: 'low' | 'medium' | 'high';
  colors?: string[];
}

const TechBackground: React.FC<TechBackgroundProps> = ({
  variant = 'particles',
  intensity = 'medium',
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLElement[] = [];

    // Create particles based on variant
    const createParticles = () => {
      const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        if (variant === 'particles') {
          particle.className = 'absolute rounded-full opacity-60 blur-sm';
          particle.style.width = `${Math.random() * 6 + 2}px`;
          particle.style.height = particle.style.width;
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        } else if (variant === 'grid') {
          particle.className = 'absolute border opacity-30';
          particle.style.width = '20px';
          particle.style.height = '20px';
          particle.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
        } else if (variant === 'neural') {
          particle.className = 'absolute rounded-full opacity-40';
          particle.style.width = `${Math.random() * 3 + 1}px`;
          particle.style.height = particle.style.width;
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];
          particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        }
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        particles.push(particle);
      }
    };

    const animateParticles = () => {
      particles.forEach((particle, index) => {
        if (variant === 'particles') {
          gsap.to(particle, {
            x: `${Math.random() * 200 - 100}px`,
            y: `${Math.random() * 200 - 100}px`,
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 20 + 10,
            repeat: -1,
            yoyo: true,
            ease: "none"
          });
        } else if (variant === 'grid') {
          gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            delay: index * 0.1
          });
        } else if (variant === 'neural') {
          gsap.to(particle, {
            x: `${Math.random() * 100 - 50}px`,
            y: `${Math.random() * 100 - 50}px`,
            opacity: Math.random() * 0.6 + 0.2,
            duration: Math.random() * 15 + 5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      });
    };

    createParticles();
    animateParticles();

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, [variant, intensity, colors]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default TechBackground; 