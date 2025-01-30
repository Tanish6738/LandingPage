import React, { useEffect } from 'react'
import Hero from './components/Hero'
import KeyFeatures from './components/KeyFeatures'
import FAQs from './components/FAQs'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './components/About'
import { motion, useScroll, useSpring } from 'framer-motion'

const App = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    // Initialize Shery.js effects if needed
    if (typeof window.Shery !== 'undefined') {
      window.Shery.mouseFollower()
      window.Shery.makeMagnet(".hover-target")
    }
  }, [])

  return (
    <div className="relative">
      <Navbar />
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-violet-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <KeyFeatures />
        <FAQs />
        <Footer />
      </main>

      {/* Mouse follower effect (if using Shery.js) */}
      <div id="mousefollower" className="relative z-50"></div>
    </div>
  )
}

export default App
