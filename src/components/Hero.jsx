import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import BlurText from '../TextAnimations/BlurText/BlurText'

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' },
    config: { duration: 1000 }
  })

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
    // Reinitialize Shery effects if needed
    if (typeof window.Shery !== 'undefined') {
      window.Shery.mouseFollower();
    }
  };

  const videoElement = useMemo(() => (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute w-full h-full object-cover"
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      <source src="./public/Untitled design.mp4" type="video/mp4" />
    </video>
  ), []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Video with improved visibility */}
      <div className="absolute inset-0 w-full h-full">
        {videoElement}
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90"></div>
      </div>

      {/* Repositioned Content with better spacing */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <animated.div style={titleAnimation} className="space-y-8 md:space-y-12">
          <div className="max-w-4xl mx-auto">
            <BlurText
              text="Redefining Code Sharing and Collaboration for Developers"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight hover-target [&>*]:mix-blend-difference"
            />
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Store, organize, and share code snippets with ease. Leverage AI to generate smarter code, collaborate in real-time, and engage with a thriving developer community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 md:mt-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
            >
              Get Started for Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-violet-400 hover:bg-violet-600/10 transition-colors backdrop-blur-sm"
            >
              Explore Features
            </motion.button>
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default React.memo(Hero); // Prevent unnecessary re-renders
