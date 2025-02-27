import React from 'react'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import FlowingCarousel from '../UI/FlowingCarousel'

const faqsData = [
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "What problem does this platform solve?",
    answer: "It addresses the common issue of losing track of valuable code snippets by providing an organized, cloud-based system to store, manage, and retrieve code effortlessly."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "Who is this platform designed for?",
    answer: "It's built for developers at all levels—from beginners struggling with code organization to experienced developers needing quick access to reusable code segments and collaborative tools."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "video",
    question: "How does the AI-powered code generation work?",
    answer: "Using the Gemini API, the platform can generate and explain code snippets based on your inputs, offering assistance in writing and understanding code faster."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "What makes this solution different from GitHub or CodePen?",
    answer: "Unlike traditional platforms that require full repositories or often have unorganized code blocks, our tool lets you store individual snippets easily and organize them intuitively. It's designed specifically for snippet management, with added features like real-time collaboration and integrated testing."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "Can I collaborate with others on this platform?",
    answer: "Absolutely. You can create groups, invite members, and work on shared code libraries, making it a great tool for team projects or community learning."
  },
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww",
    type: "image",
    question: "What extra functionalities are available?",
    answer: "In addition to code storage and AI-assisted generation, you have access to an online IDE for testing, a blog system for community support, web scraping tools, and even PDF creation for documentation."
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

          <div className="w-full max-w-5xl mx-auto">
            <FlowingCarousel items={faqsData} />
          </div>
        </div>
      </TextParallaxContent>
    </div>
  )
}

export default FAQs
