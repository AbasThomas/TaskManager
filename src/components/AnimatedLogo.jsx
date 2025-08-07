import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'; // Custom hook

const AnimatedLogo = ({ darkMode }) => {
  // Refs
  const logoContainer = useRef(null);
  const zPath = useRef(null);
  const dots = useRef([]);
  const glow = useRef(null);
  const ring = useRef(null);
  const animationRef = useRef(null);
  const hoverAnimationRef = useRef(null);

  // Accessibility hook
  const prefersReducedMotion = usePrefersReducedMotion();

  // Dot configuration
  const dotConfig = [
    { x: 8, y: 6, delay: 0, color: darkMode ? 'bg-indigo-400' : 'bg-indigo-600' },
    { x: 10, y: 8, delay: 0.2, color: darkMode ? 'bg-purple-400' : 'bg-purple-600' },
    { x: 12, y: 10, delay: 0.4, color: darkMode ? 'bg-pink-400' : 'bg-pink-600' }
  ];

  // Initialize animations
  const initAnimations = useCallback(() => {
    // Clear any existing animations
    if (animationRef.current) animationRef.current.kill();
    if (hoverAnimationRef.current) hoverAnimationRef.current.kill();

    // Main animation timeline
    const masterTl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 0.5,
      paused: prefersReducedMotion 
    });

    // Dot wave animation (3 cycles)
    for (let cycle = 0; cycle < 3; cycle++) {
      const cycleTl = gsap.timeline();
      
      dotConfig.forEach((dot, i) => {
        cycleTl.to(dots.current[i], {
          y: `-=${dot.y * 0.8}`,
          x: `+=${i % 2 ? -1 : 1}`,
          duration: 0.4,
          ease: "sine.inOut",
          delay: dot.delay
        }, 0)
        .to(dots.current[i], {
          y: `+=${dot.y * 0.8}`,
          x: `-=${i % 2 ? -1 : 1}`,
          duration: 0.6,
          ease: "bounce.out"
        }, `>${0.2 + dot.delay}`);
      });

      masterTl.add(cycleTl);
    }

    // Z-path animation
    masterTl.to(zPath.current, {
      rotate: 5,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    }, 0)
    .to(zPath.current, {
      rotate: 0,
      duration: 1.5,
      ease: "back.out(4)"
    }, ">0.3");

    // Glow and ring effects
    masterTl.to(glow.current, {
      scale: 1.3,
      opacity: 0.4,
      duration: 1.8,
      ease: "sine.inOut"
    }, 0)
    .to(ring.current, {
      rotate: 180,
      duration: 3.6,
      ease: "none"
    }, 0)
    .to(glow.current, {
      scale: 1,
      opacity: 0.2,
      duration: 1.8,
      ease: "sine.inOut"
    }, ">0.2");

    animationRef.current = masterTl;

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(logoContainer.current, {
      scale: 1.15,
      duration: 0.4,
      ease: "back.out(3)"
    })
    .to(zPath.current, {
      rotate: 10,
      duration: 0.3
    }, 0)
    .to(dots.current, {
      y: -15,
      x: (i) => i % 2 ? "+=3" : "-=3",
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(2)"
    }, 0)
    .to(glow.current, {
      scale: 1.8,
      opacity: 0.6,
      duration: 0.4
    }, 0)
    .to(ring.current, {
      strokeWidth: 3,
      duration: 0.3
    }, 0);

    hoverAnimationRef.current = hoverTl;

    // Event listeners
    const container = logoContainer.current;
    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('focus', handleMouseEnter);
    container.addEventListener('blur', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('focus', handleMouseEnter);
      container.removeEventListener('blur', handleMouseLeave);
    };
  }, [darkMode, prefersReducedMotion]);

  useEffect(() => {
    const cleanup = initAnimations();
    
    // Play animation if motion is not reduced
    if (!prefersReducedMotion && animationRef.current) {
      animationRef.current.play();
    }

    return () => {
      cleanup && cleanup();
      if (animationRef.current) animationRef.current.kill();
      if (hoverAnimationRef.current) hoverAnimationRef.current.kill();
    };
  }, [initAnimations, prefersReducedMotion]);

  return (
    <div 
      ref={logoContainer}
      className="relative w-16 h-16 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      aria-label="Zentra Logo"
      tabIndex="0" // Make it focusable for keyboard users
    >
      {/* Animated glow */}
      <div 
        ref={glow}
        className={`absolute inset-0 rounded-full ${
          darkMode ? 'bg-indigo-500/20' : 'bg-indigo-300/30'
        } blur-md transition-colors duration-300`}
        aria-hidden="true"
      />
      
      {/* Animated ring */}
      <svg 
        ref={ring}
        width="64" 
        height="64" 
        viewBox="0 0 64 64" 
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <circle 
          cx="32" 
          cy="32" 
          r="28" 
          fill="none" 
          stroke={darkMode ? 'rgba(129, 140, 248, 0.3)' : 'rgba(99, 102, 241, 0.3)'}
          strokeWidth="1.5"
          strokeDasharray="160 160"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
      </svg>
      
      {/* Z symbol */}
      <svg 
        ref={zPath}
        width="44" 
        height="44" 
        viewBox="0 0 44 44" 
        fill="none" 
        className="absolute z-10 transition-colors duration-300"
        aria-hidden="true"
      >
        <path 
          d="M12 12 L32 12 L12 32 L32 32" 
          stroke={darkMode ? "#818cf8" : "#4f46e5"} 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>     
    </div>
  );
};

export default AnimatedLogo;