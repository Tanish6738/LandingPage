import React from 'react'
import Stack from './Stack/Stack'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import { motion } from 'framer-motion'

const KeyFeatures = () => {
  const featuresData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=500&auto=format&fit=crop&q=60",
      title: "Streamlined Code Management",
      description: "Create individual entries or structured directories for your code snippets. Our intuitive organization system ensures every piece of code is easily accessible and well-documented."
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60",
      title: "Collaborative Workspaces",
      description: "Foster real-time collaboration through custom groups and team workspaces. Share projects, review code, and work together seamlessly in a synchronized environment."
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60",
      title: "AI-Powered Assistance",
      description: "Utilize our integrated Gemini API to generate code, get explanations, and receive intelligent suggestions. Let AI help you overcome coding challenges efficiently."
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=500&auto=format&fit=crop&q=60",
      title: "Integrated Development Tools",
      description: "Experience seamless development with our browser-based IDE, built-in version control, and comprehensive testing environment—all in one unified platform."
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60",
      title: "Smart Code Search",
      description: "Find any piece of code instantly with our advanced search capabilities. Use filters, tags, and natural language queries to locate the exact code snippets you need."
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60",
      title: "Automated Documentation",
      description: "Generate comprehensive documentation automatically from your code. Add custom notes, examples, and explanations to make your code more accessible to team members."
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=500&auto=format&fit=crop&q=60",
      title: "Code Analytics Dashboard",
      description: "Get detailed insights into your development process with real-time analytics. Track team productivity, code quality metrics, and project progress all in one place."
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500&auto=format&fit=crop&q=60",
      title: "Security & Compliance",
      description: "Ensure your code meets industry standards with built-in security scanning and compliance checks. Identify vulnerabilities and maintain secure coding practices."
    }
  ];

  return (
    <div id="features" className="relative bg-gradient-to-b from-slate-900 to-slate-950">
      <TextParallaxContent
        imgUrl="/new.mp4"
        subheading="Advanced Features"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24 pt-16 sm:pt-24">
          <div className="mb-8 sm:mb-16">
            <AnimatedTextUnderlign
              preText="Elevate Your "
              highlightedText="Development Workflow"
              postText=" Today"
              className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !text-white"
              animate={true}
              animationInterval={2000}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-16 md:grid-cols-12">
            <div className="col-span-1 md:col-span-5 space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Transform your development process with our comprehensive toolkit. We've simplified code management while providing powerful features that enhance productivity and collaboration.
              </p>
              <div className="rounded-xl sm:rounded-2xl bg-slate-800/50 p-4 sm:p-6 backdrop-blur-sm">
                <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-white">
                  Additional Utilities
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Community Blog & Knowledge Base
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Automated Web Scraping Tools
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    PDF Documentation Generator
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Enhanced Team Collaboration
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-7 relative mt-8 sm:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-12 right-4 sm:right-8 z-10 transform rotate-2"
              >
                <div className="bg-teal-500/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-teal-500/20">
                  <p className="text-teal-400 text-xs sm:text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                    </svg>
                    Try dragging the cards to explore!
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-center md:justify-start">
                <Stack 
                  cardsData={featuresData}
                  cardDimensions={{
                    width: Math.min(window.innerWidth - 32, 400),
                    height: Math.min(window.innerWidth * 0.75 - 32, 300)
                  }}
                  sensitivity={150}
                  randomRotation={true}
                  sendToBackOnClick={true}
                  animationConfig={{ stiffness: 300, damping: 25 }}
                />
              </div>
            </div>
          </div>
        </div>
      </TextParallaxContent>
    </div>
  )
}

export default KeyFeatures
