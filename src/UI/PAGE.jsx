import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const defaultTheme = {
  primary: 'teal',
  secondary: 'slate',
  text: {
    light: 'white',
    dark: 'gray-900',
    muted: 'gray-300'
  },
  background: {
    gradient: {
      from: 'slate-900',
      to: 'slate-950'
    }
  }
};

// Internal Card Component for Stack
const CardRotate = ({ children, onSendToBack, sensitivity }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
};

// Add this hook before the Stack component
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Mobile Card Component
const MobileCard = ({ card, isActive, onClick }) => {
  return (
    <motion.div
      className={`w-full rounded-xl overflow-hidden cursor-pointer ${
        isActive ? 'h-48' : 'h-20'
      } transition-all duration-500 ease-in-out`}
      onClick={onClick}
      layout
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
        <img
          src={card.img}
          alt={`card-${card.id}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white font-bold text-lg">{card.title}</h3>
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-sm mt-2"
            >
              {card.description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Internal Stack Component
const Stack = ({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) => {
  const [cards, setCards] = useState(cardsData);
  const [activeCard, setActiveCard] = useState(cards[cards.length - 1]);
  const { width } = useWindowSize();
  const isMobile = width < 768; // Define mobile breakpoint

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full space-y-4">
        {cards.map((card) => (
          <MobileCard
            key={card.id}
            card={card}
            isActive={activeCard.id === card.id}
            onClick={() => setActiveCard(card)}
          />
        ))}
      </div>
    );
  }

  // Desktop layout (existing code)
  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      setActiveCard(newCards[newCards.length - 1]);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <div className="relative" style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 800,
      }}>
        {cards.map((card, index) => {
          const randomRotate = randomRotation ? Math.random() * 8 - 4 : 0;
          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
            >
              <motion.div
                className="absolute w-full h-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  sendToBackOnClick && sendToBack(card.id);
                }}
                animate={{
                  rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                  scale: 1 + index * 0.05 - cards.length * 0.05,
                  transformOrigin: "90% 90%",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: cardDimensions.width,
                  height: cardDimensions.height,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 z-10" />
                <img
                  src={card.img}
                  alt={`card-${card.id}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </motion.div>
            </CardRotate>
          );
        })}
      </div>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeCard.id}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-xl bg-slate-800/50 p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-4">
            {activeCard.title}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {activeCard.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Internal AnimatedTextUnderline Component
const AnimatedTextUnderline = ({ preText, highlightedText, postText, className = "" }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay: 0.5, duration: 1 }
      }
    }
  };

  return (
    <h1 className={`text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl ${className}`}>
      {preText}
      <span className="relative whitespace-nowrap text-teal-800 font-alliance">
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute left-0 top-1/3 fill-teal-500"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            variants={draw}
            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203"
            strokeWidth="6"
            fill="none"
            stroke="#009080"
          />
        </motion.svg>
        <span className="relative text-teal-800 font-alliance">{highlightedText}</span>
      </span>
      {postText}
    </h1>
  );
};

// Internal TextParallaxContent Component
const TextParallaxContent = ({ imgUrl, subheading, heading, title, children }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  // Modified animation values to start visible
  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -50]); // Changed initial value to 0
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]); // Changed initial value to 1
  const subheadingScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]); // Changed initial value to 1

  return (
    <div style={{ paddingLeft: 12, paddingRight: 12 }}>
      <div className="relative h-[150vh]">
        <motion.div
          style={{ scale }}
          ref={targetRef}
          className="sticky z-0 overflow-hidden rounded-3xl h-[calc(100vh-24px)] top-3"
        >
          {imgUrl?.toLowerCase().endsWith('.mp4') ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={imgUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 w-full h-full"
            />
          )}
          <motion.div
            className="absolute inset-0 bg-neutral-950/70"
            style={{ opacity }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 1, y: 0 }} // Added initial state
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -250]), // Modified to start at 0
            opacity: useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 1, 0]), // Modified to start visible
          }}
          className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
          {title && (
            <motion.h1
              initial={{ opacity: 1, y: 0 }} // Added initial state
              style={{
                y: titleY,
                opacity: titleOpacity,
              }}
              className="mb-6 text-6xl font-bold tracking-tight md:text-8xl"
            >
              {title}
            </motion.h1>
          )}
          <motion.p
            initial={{ opacity: 1, scale: 1 }} // Added initial state
            style={{
              scale: subheadingScale,
              opacity: titleOpacity,
            }}
            className="mb-2 text-center text-xl md:mb-4 md:text-3xl"
          >
            {subheading}
          </motion.p>
          <motion.p
            initial={{ opacity: 1, y: 0 }} // Added initial state
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -100]), // Modified to start at 0
              opacity: titleOpacity,
            }} 
            className="text-center text-4xl font-bold md:text-7xl"
          >
            {typeof heading === 'object' 
              ? `${heading.preText}${heading.highlightedText}${heading.postText}`
              : heading}
          </motion.p>
        </motion.div>
      </div>
      {children}
    </div>
  );
};

// Main CustomPage Component
const CustomPage = ({
  theme = defaultTheme,
  videoUrl = "/new.mp4",
  title = "Welcome",  // Add this new prop
  heading = {
    preText: "Discover ",
    highlightedText: "Powerful Tools",
    postText: " for Modern Development"
  },
  description = "Experience the next generation of development tools...",
  features = [],
  highlights = [],
  stackConfig = {
    cardDimensions: {
      width: typeof window !== 'undefined' 
        ? Math.min(window.innerWidth * 0.8, 350) // Reduced from 0.85 to 0.8 and max width to 350
        : 350,
      height: typeof window !== 'undefined'
        ? Math.min(window.innerWidth * 0.5, 250) // Reduced from 0.6 to 0.5 and max height to 250
        : 250
    },
    sensitivity: 150,
    randomRotation: true,
    sendToBackOnClick: true,
    animationConfig: { stiffness: 300, damping: 25 }
  }
}) => {
  return (
    <div className={`relative bg-gradient-to-b from-${theme.background.gradient.from} to-${theme.background.gradient.to}`}>
      <TextParallaxContent
        imgUrl={videoUrl}
        title={title}
        subheading="Key Features"
        heading={`${heading.preText}${heading.highlightedText}${heading.postText}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-32 pt-12 sm:pt-24">
          <div className="mb-8 sm:mb-16">
            <AnimatedTextUnderline
              preText={heading.preText}
              highlightedText={heading.highlightedText}
              postText={heading.postText}
              className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !text-white"
              animate={true}
              animationInterval={2000}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-12">
            <div className="col-span-1 md:col-span-5 space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed md:text-xl">
                {description}
              </p>
              
              <div className="rounded-2xl bg-slate-800/50 p-4 sm:p-6 backdrop-blur-sm">
                <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-white">
                  Platform Highlights
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-teal-400">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 sm:-top-12 right-4 sm:right-8 z-10 transform rotate-2"
              >
                <div className={`bg-${theme.primary}-500/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-${theme.primary}-500/20`}>
                  <p className={`text-${theme.primary}-400 text-xs sm:text-sm font-medium flex items-center`}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                    </svg>
                    Try dragging the cards!
                  </p>
                </div>
              </motion.div>

              <div className="w-full flex justify-center px-2 sm:px-4">
                <div className="max-w-[280px] sm:max-w-none w-full">
                  <Stack 
                    cardsData={features}
                    {...stackConfig}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TextParallaxContent>
    </div>
  );
};

// Example usage
const exampleFeatures = [
  {
    id: 1,
    img: "https://example.com/ai.jpg",
    title: "AI-Powered Code Generation",
    description: "Experience the future of coding with our advanced AI..."
  },
  // ... more features
];

const exampleHighlights = [
  "AI-powered code suggestions",
  "Real-time collaboration tools",
  "Advanced version control",
  "Comprehensive analytics"
];

export const ExampleCustomPage = () => (
  <CustomPage
    theme={{
      primary: 'blue',
      secondary: 'gray',
      text: {
        light: 'white',
        dark: 'gray-900',
        muted: 'gray-300'
      },
      background: {
        gradient: {
          from: 'gray-900',
          to: 'gray-950'
        }
      }
    }}
    videoUrl="/custom-video.mp4"
    title="Welcome to Our Platform"
    heading={{
      preText: "Build ",
      highlightedText: "Amazing Apps",
      postText: " with Our Platform"
    }}
    description="Custom description here..."
    features={exampleFeatures}
    highlights={exampleHighlights}
    stackConfig={{
      cardDimensions: { width: 350, height: 250 },
      sensitivity: 120,
      randomRotation: true
    }}
  />
);

export default CustomPage;
