import React from 'react'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'
import FlowingCarousel from '../UI/FlowingCarousel'

const faqsData = [
  {
    media: "https://plus.unsplash.com/premium_photo-1682689380891-9221b86883d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBnZW5lcmF0aW9ufGVufDB8fDB8fHww", // Replace with actual video URL
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
        imgUrl="https://drive.google.com/file/d/1VbA01CIIG6jb5w1UwopP0fdrjYviHevT/view?usp=sharing"
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
