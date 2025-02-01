import React, { useEffect } from 'react'
import Hero from './components/Hero'
import CustomPage from './UI/PAGE'
import FAQs from './components/FAQs'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './components/About'
import { motion, useScroll, useSpring } from 'framer-motion'

const features = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1681426690743-1a2f26db94fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "AI-Powered Development",
    description: "Harness the power of artificial intelligence to streamline your coding workflow and boost productivity."
  },
  {
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1661274033354-1847f286e957?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29sbGFib3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Seamless Collaboration",
    description: "Work together in real-time with advanced collaboration features designed for modern development teams."
  },
  {
    id: 3,
    img: "https://plus.unsplash.com/premium_photo-1683115179716-8463fcfca85b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVyc2lvbiUyMGNvbnRyb2xsfGVufDB8fDB8fHww",
    title: "Intelligent Version Control",
    description: "Advanced version control system with smart branching, merging, and conflict resolution capabilities."
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl0aWNzfGVufDB8fDB8fHww",
    title: "Performance Analytics",
    description: "Comprehensive analytics and insights to optimize your development process and team performance."
  }
];

const highlights = [
  "Advanced AI code assistance",
  "Real-time pair programming",
  "Integrated CI/CD pipeline",
  "Smart code review system",
  "Automated testing tools",
  "Cloud-native deployment"
];

const theme = {
  primary: 'teal',
  secondary: 'slate',
  text: {
    light: 'white',
    dark: 'slate-900',
    muted: 'gray-300'  // Changed from slate-300 to gray-300 for better visibility
  },
  background: {
    gradient: {
      from: 'slate-900',
      to: 'slate-950'
    }
  }
};

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
        className="fixed top-0 left-0 right-0 h-1 bg-teal-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <CustomPage
          title="Next-Gen Development Platform"
          videoUrl="/new.mp4"
          features={features}
          highlights={highlights}
          heading={{
            preText: "Build ",
            highlightedText: "Future-Ready",
            postText: " Applications"
          }}
          description="Elevate your development experience with our comprehensive suite of next-generation tools, AI-powered assistance, and seamless collaboration features."
          theme={theme}
          stackConfig={{
            cardDimensions: { width: 400, height: 300 },
            sensitivity: 150,
            randomRotation: true,
            sendToBackOnClick: true,
            animationConfig: { stiffness: 300, damping: 25 }
          }}
        />
        <FAQs />
        <Footer />
      </main>

      {/* Mouse follower effect (if using Shery.js) */}
      <div id="mousefollower" className="relative z-50"></div>
    </div>
  )
}

export default App
