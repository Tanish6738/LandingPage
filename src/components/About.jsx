import React from 'react'
import { TextParallaxContent } from '../UI/TextParallaxContent'
import AnimatedTextUnderlign from '../UI/AnimatedTextUnderlign'

const About = () => {
  return (
    <div className="relative bg-gradient-to-b from-slate-950 to-slate-900">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
        subheading="About Our Platform"
      >
        <div className="mx-auto max-w-6xl px-6 pb-32 pt-24">
          <div className="mb-16">
            <AnimatedTextUnderlign
              preText="Empowering "
              highlightedText="Developers"
              postText=" Through Collaboration"
              className="!text-4xl md:!text-5xl lg:!text-6xl !text-white"
              animate={true}
              animationInterval={2000}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="col-span-1 space-y-6 md:col-span-8">
              <p className="text-lg text-gray-300 leading-relaxed md:text-xl">
                Our platform is built by developers, for developers. We understand the challenges
                of modern software development and provide tools that make code sharing and
                collaboration seamless and efficient.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed md:text-xl">
                With advanced AI features, real-time collaboration tools, and a vibrant
                community of passionate developers, we're creating the future of code sharing.
              </p>
              <div className="pt-6">
                <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 px-8 py-4 text-lg font-medium text-white transition-all hover:shadow-xl hover:shadow-teal-500/20">
                  Join Our Community
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-4">
              <div className="rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">Why Choose Us</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Real-time collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Advanced AI features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-teal-500">•</span>
                    Active community
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TextParallaxContent>
    </div>
  )
}

export default About
