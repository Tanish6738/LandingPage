import React from 'react'
import Stack from './Stack/Stack'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import { motion } from 'framer-motion'

const KeyFeatures = () => {
  const featuresData = [
    {
      id: 1,
      img: "https://plus.unsplash.com/premium_photo-1681426690743-1a2f26db94fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "AI-Powered Code Generation",
      description: "Experience the future of coding with our advanced AI that helps you write better code faster. Get intelligent suggestions and autocomplete that learns from your coding style."
    },
    {
      id: 2,
      img: "https://plus.unsplash.com/premium_photo-1661274033354-1847f286e957?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29sbGFib3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Real-Time Collaboration",
      description: "Code together in real-time with your team. Share your workspace, make live edits, and see changes instantly. Perfect for pair programming and code reviews."
    },
    {
      id: 3,
      img: "https://plus.unsplash.com/premium_photo-1683115179716-8463fcfca85b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVyc2lvbiUyMGNvbnRyb2xsfGVufDB8fDB8fHww",
      title: "Smart Version Control",
      description: "Keep track of every change with our integrated version control system. Branch, merge, and maintain a clear history of your code evolution."
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl0aWNzfGVufDB8fDB8fHww",
      title: "Advanced Analytics",
      description: "Gain insights into your coding patterns, team productivity, and code quality metrics. Make data-driven decisions to improve your development process."
    }
  ];

  return (
    <div id="features" className="relative bg-gradient-to-b from-slate-900 to-slate-950">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        subheading="Key Features"
      >
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-24">
          <div className="mb-16">
            <AnimatedTextUnderlign
              preText="Discover "
              highlightedText="Powerful Tools"
              postText=" for Modern Development"
              className="!text-4xl md:!text-5xl lg:!text-6xl !text-white"
              animate={true}
              animationInterval={2000}
            />
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="col-span-1 md:col-span-5 space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed md:text-xl">
                Experience the next generation of development tools designed to streamline
                your workflow and boost productivity. Our platform combines cutting-edge
                AI with intuitive collaboration features.
              </p>
              <div className="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">Platform Highlights</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    AI-powered code suggestions
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Real-time collaboration tools
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Advanced version control
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Comprehensive analytics
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-12 right-8 z-10 transform rotate-2"
              >
                <div className="bg-teal-500/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-teal-500/20">
                  <p className="text-teal-400 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                    </svg>
                    Try dragging the cards to explore!
                  </p>
                </div>
              </motion.div>

              <Stack 
                cardsData={featuresData}
                cardDimensions={{ width: 400, height: 300 }}
                sensitivity={150}
                randomRotation={true}
                sendToBackOnClick={true}
                animationConfig={{ stiffness: 300, damping: 25 }}
              />
            </div>
          </div>
        </div>
      </TextParallaxContent>
    </div>
  )
}

export default KeyFeatures
