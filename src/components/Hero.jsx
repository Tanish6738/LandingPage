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
        backfaceVisibility: 'hidden',
        objectFit: 'cover',
      }}
    >
      <source src="/Untitled design.mp4" type="video/mp4" />
    </video>
  ), []);

  return (
    <div id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Video with improved mobile handling */}
      <div className="absolute inset-0 w-full h-full">
        {videoElement}
        {/* Enhanced gradient overlay with better mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95"></div>
      </div>

      {/* Content container with improved responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20" ref={ref}>
        <animated.div style={titleAnimation} className="space-y-6 sm:space-y-8 lg:space-y-12">
          <div className="max-w-4xl mx-auto text-center px-4">
            <BlurText
              text="Redefining Code Sharing and Collaboration for Developers"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight tracking-tight"
            />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 text-center">
            Store, organize, and share code snippets with ease. Leverage AI to generate smarter code, collaborate in real-time, and engage with a thriving developer community.
          </p>
          
          {/* Responsive button container */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-6 sm:mt-8 lg:mt-12 px-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20 text-sm sm:text-base"
            >
              Get Started for Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-violet-400 hover:bg-violet-600/10 transition-colors backdrop-blur-sm text-sm sm:text-base"
            >
              Explore Features
            </motion.button>
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default React.memo(Hero)
