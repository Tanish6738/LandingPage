import React from 'react'
import Hero from './components/Hero'
import KeyFeatures from './components/KeyFeatures'
import About from './components/About'
import FAQs from './components/FAQs'

const App = () => {
  return (
    <main className="relative min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Key Features Section */}
      <section id="features">
        <KeyFeatures />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* FAQs Section */}
      <section id="faqs">
        <FAQs />
      </section>
    </main>
  )
}

export default App
