/*
	jsrepo 1.29.1
	Installed from https://reactbits.dev/tailwind/
	30-1-2025
*/

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSprings, animated } from '@react-spring/web';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  // Default animations based on direction
  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Debounced animation update
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    // Initialize Shery effect after component mounts
    if (typeof window.Shery !== 'undefined') {
      window.Shery.hoverWithMediaCircle(".hover-target" /* Element to target.*/, {
        videos: ["./public/Untitled design.mp4"],
        style: {
          transform: 'translate3d(0,0,0)', // Hardware acceleration
          willChange: 'transform', // Performance hint
          mixBlendMode: "difference",  // Adds contrast on hover
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Lighter background for better contrast
          borderRadius: "50%",
          width: '250px',
          height: '250px',
          position: 'fixed', // Keep size fixed
          pointerEvents: 'none' // Prevent interference with text
        },
        throttleSpeed: 0, // Remove throttling for smoother movement
      });
    }
  }, []);

  const handleComplete = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
      // Add hover-target class after animation completes
      if (ref.current) {
        ref.current.classList.add('blur-text-hover');
      }
    }
  };

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
          for (const step of (animationTo || defaultTo)) {
            await next(step);
          }
          animatedCount.current += 1;
          if (animatedCount.current === elements.length) {
            handleComplete();
          }
        }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <p 
      ref={ref} 
      className={`blur-text ${className} flex flex-wrap cursor-pointer relative group`}
      style={{
        isolation: "isolate",
        color: "white", // Default white text
        mixBlendMode: "difference", // This will create the contrast effect
        transform: 'translate3d(0,0,0)', // Enable hardware acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000,
        willChange: 'transform', // Optimize transitions
        position: 'relative', // Ensure proper stacking
        zIndex: 1 // Maintain proper layering
      }}
    >
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            transition: "all 0.3s ease",
          }}
          className="inline-block transition-transform will-change-[transform,filter,opacity] hover:text-white"
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

export default React.memo(BlurText); // Prevent unnecessary re-renders