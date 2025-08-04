import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedLogo = ({ darkMode }) => {
  const logoContainer = useRef(null);
  const zPath = useRef(null);
  const dots = useRef([]);
  const glow = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    // Dot positions (x, y, delay multiplier)
    const dotConfig = [
      { x: 8, y: 6, delay: 0 },
      { x: 10, y: 8, delay: 0.2 },
      { x: 12, y: 10, delay: 0.4 }
    ];

    // Main animation timeline
    const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

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

    logoContainer.current.addEventListener('mouseenter', () => hoverTl.play());
    logoContainer.current.addEventListener('mouseleave', () => hoverTl.reverse());

    return () => {
      masterTl.kill();
      hoverTl.kill();
    };
  }, []);

  return (
    <div 
      ref={logoContainer}
      className="relative w-16 h-16 flex items-center justify-center cursor-pointer"
      aria-label="Zentra Logo"
    >
      {/* Animated glow */}
      <div 
        ref={glow}
        className={`absolute inset-0 rounded-full ${
          darkMode ? 'bg-indigo-500/20' : 'bg-indigo-300/30'
        } blur-md transition-colors duration-300`}
      />
      
      {/* Animated ring */}
      <svg 
        ref={ring}
        width="64" 
        height="64" 
        viewBox="0 0 64 64" 
        className="absolute inset-0 w-full h-full"
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
      >
        <path 
          d="M12 12 L32 12 L12 32 L32 32" 
          stroke={darkMode ? "#818cf8" : "#4f46e5"} 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Perfectly aligned dots */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          ref={el => dots.current[i] = el}
          className={`absolute w-3 h-3 rounded-full z-20 ${
            darkMode 
              ? ['bg-indigo-400', 'bg-purple-400', 'bg-pink-400'][i] 
              : ['bg-indigo-600', 'bg-purple-600', 'bg-pink-600'][i]
          } shadow-sm transition-colors duration-300`}
          style={{
            left: `${6 + i * 3}px`,
            top: `${6 + i * 3}px`,
            transform: 'translate(0, 0)'
          }}
        />
      ))}
    </div>
  );
};
export default AnimatedLogo;  