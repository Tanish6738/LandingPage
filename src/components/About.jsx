import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import SpotlightCard from './SpotlightCard/SpotlightCard'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const stats = [
    { id: 1, name: 'Code Storage', value: 'Unlimited' },
    { id: 2, name: 'Online IDE', value: 'Built-in' },
    { id: 3, name: 'AI Integration', value: 'Gemini API' },
    { id: 4, name: 'Collaboration', value: 'Real-time' },
  ]

  return (
    <div id="about" className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            <AnimatedTextUnderlign
              preText="About "
              highlightedText="The Project"
              postText=""
              className="!text-3xl md:!text-4xl lg:!text-5xl !text-white mb-8"
              animate={true}
              animationInterval={2000}
            />
            
            <motion.p 
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              As an AI & ML undergraduate at IPS Academy Institute of Engineering and Science, 
              I experienced firsthand the challenges of managing scattered code snippets. This platform 
              was born from that need - a solution to help developers efficiently store, organize, and 
              retrieve their code without the hassle of searching through local files.
            </motion.p>

            <div className="mt-10 max-w-xl space-y-8">
              {[
                {
                  heading: "Smart Code Management",
                  description: "Upload, organize, and retrieve your code snippets with ease."
                },
                {
                  heading: "Integrated Development",
                  description: "Built-in online IDE for quick edits and testing, enhanced with Gemini API for AI-powered code generation."
                },
                {
                  heading: "Collaborative Features",
                  description: "Work together in groups, share code, and maintain a centralized code repository."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.heading}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <dt className="inline font-semibold text-white text-lg">
                    {feature.heading}
                  </dt>
                  <dd className="inline ml-3 text-gray-400">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpotlightCard 
                  className="h-full"
                  spotlightColor="rgba(99, 102, 241, 0.15)"
                >
                  <motion.dt
                    className="text-base leading-7 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {stat.name}
                  </motion.dt>
                  <motion.dd
                    className="text-2xl font-bold leading-9 tracking-tight text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {stat.value}
                  </motion.dd>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
