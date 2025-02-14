import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const contentVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const itemVariants = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  },
};

const FlowingCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  const handleItemClick = (index) => {
    if (activeIndex === index) {
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950" ref={containerRef}>
      <div className="flex flex-col w-full">
        {items.map((item, idx) => (
          <CarouselItem
            key={idx}
            item={item}
            isActive={activeIndex === idx}
            onClick={() => handleItemClick(idx)}
          />
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
              duration: 0.7 
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-slate-900/90 backdrop-blur-sm"
          >
            <motion.div
              key={activeIndex}
              className="p-8 h-full flex flex-col justify-center"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div 
                className="space-y-6"
                variants={contentVariants}
              >
                <motion.h3 
                  variants={itemVariants}
                  className="text-2xl font-bold text-white"
                >
                  {items[activeIndex].question}
                </motion.h3>
                <motion.p 
                  variants={itemVariants}
                  className="text-slate-300"
                >
                  {items[activeIndex].answer}
                </motion.p>
                {items[activeIndex].media && (
                  <motion.div 
                    variants={itemVariants}
                    className="w-full aspect-video rounded-lg overflow-hidden"
                  >
                    <motion.div
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ 
                        scale: 1,
                        opacity: 1,
                        transition: { 
                          duration: 1.2,
                          ease: [0.6, 0.05, 0.01, 0.9]
                        }
                      }}
                      className="w-full h-full bg-cover bg-center transform-gpu"
                      style={{ backgroundImage: `url(${items[activeIndex].media})` }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CarouselItem = ({ item, isActive, onClick }) => {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const handleMouseEnter = () => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(marqueeRef.current, { y: '-101%' })
      .set(marqueeInnerRef.current, { y: '101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = () => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(marqueeRef.current, { y: '101%' })
      .to(marqueeInnerRef.current, { y: '-101%' });
  };

  return (
    <div 
      ref={itemRef}
      className={`relative h-24 overflow-hidden cursor-pointer border-b border-slate-800
        ${isActive ? 'bg-slate-800' : 'hover:bg-slate-900'}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center h-full px-8">
        <h3 className="text-xl text-white font-medium">
          {item.question}
        </h3>
      </div>

      <div
        ref={marqueeRef}
        className="absolute inset-0 bg-teal-500 translate-y-[101%]"
      >
        <div
          ref={marqueeInnerRef}
          className="h-full flex items-center px-8"
        >
          <span className="text-xl text-white font-medium">
            {item.question}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlowingCarousel;
