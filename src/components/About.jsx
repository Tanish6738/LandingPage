import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const stats = [
    { id: 1, name: 'Active Users', value: '50K+' },
    { id: 2, name: 'Code Snippets Shared', value: '1M+' },
    { id: 3, name: 'Teams Collaborating', value: '10K+' },
    { id: 4, name: 'Countries Reached', value: '150+' },
  ]

  return (
    <div id="about" className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            <AnimatedTextUnderlign
              preText="Why Choose "
              highlightedText="CodeShare"
              postText="?"
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
              CodeShare revolutionizes the way developers collaborate and share code. 
              Our platform combines cutting-edge AI technology with intuitive collaboration 
              tools to create a seamless development experience.
            </motion.p>

            <div className="mt-10 max-w-xl space-y-8">
              {[
                {
                  heading: "AI-Powered Development",
                  description: "Leverage advanced AI to write better code faster and more efficiently."
                },
                {
                  heading: "Seamless Collaboration",
                  description: "Work together in real-time with developers from around the world."
                },
                {
                  heading: "Enterprise Security",
                  description: "Your code is protected with enterprise-grade security measures."
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
                className="backdrop-blur-sm bg-slate-800/30 rounded-2xl p-8 border border-slate-700/30"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
