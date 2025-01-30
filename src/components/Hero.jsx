import React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <animated.div style={titleAnimation}>
          <h1 className="text-6xl font-bold text-white mb-8">
            Redefining Code Sharing and Collaboration for Developers
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Store, organize, and share code snippets with ease. Leverage AI to generate smarter code, collaborate in real-time, and engage with a thriving developer community.
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              Get Started for Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold border-2 border-violet-400 hover:bg-violet-800/30 transition-colors"
            >
              Explore Features
            </motion.button>
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default Hero
