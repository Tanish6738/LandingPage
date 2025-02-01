import React from 'react'
import { SwipeCarousel } from '../UI/SwipeCarousel'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import { motion } from 'framer-motion'

const faqsData = [
  {
    media: "https://example.com/ai-demo.mp4", // Replace with actual video URL
    type: "video",
    question: "How does the AI code generation work?",
    answer: "Our AI system analyzes patterns from millions of code repositories to provide intelligent suggestions and autocompletions tailored to your coding style and project context."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "What collaboration features are available?",
    answer: "We offer real-time collaborative editing, shared workspaces, live chat, and integrated code review tools to make team development seamless."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "How secure is the platform?",
    answer: "We implement enterprise-grade security measures including end-to-end encryption, two-factor authentication, and regular security audits."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "Can I use it with my existing tools?",
    answer: "Yes! Our platform integrates with popular IDEs, version control systems, and development tools to fit seamlessly into your workflow."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "What about version control?",
    answer: "Our integrated version control system supports branching, merging, and conflict resolution with an intuitive interface."
  }
];

const FAQs = () => {
  return (
    <div id="faqs" className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-20">
      <TextParallaxContent
        imgUrl="/fdss.mp4"
        subheading="Frequently Asked Questions"
      >
        <div className="mx-auto max-w-[95%] px-4 pb-32 pt-24">
          <div className="mb-16 text-center">
            <AnimatedTextUnderlign
              preText="Common "
              highlightedText="Questions"
              postText=" Answered"
              className="!text-4xl md:!text-5xl lg:!text-6xl !text-white"
              animate={true}
              animationInterval={2000}
            />
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to the most frequently asked questions about our platform and services
            </p>
          </div>

          <div className="carousel-wrapper w-full">
            <SwipeCarouselWithContent items={faqsData} />
          </div>
        </div>
      </TextParallaxContent>
    </div>
  )
}

const SwipeCarouselWithContent = ({ items }) => {
  return (
    <div className="relative py-4 w-full">
      <SwipeCarousel>
        {items.map((item, index) => (
          <div key={index} className="w-full">
            <motion.div 
              className="mx-auto bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl h-full"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-5/12 h-[200px] md:h-[400px] relative">
                  {item.type === 'video' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={item.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.media}
                      alt={`FAQ illustration ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
                </div>
                
                <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold mb-6 text-white"
                  >
                    {item.question}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {item.answer}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </SwipeCarousel>
    </div>
  )
}

export default FAQs
