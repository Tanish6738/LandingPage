/*
	jsrepo 1.29.1
	Installed from https://reactbits.dev/tailwind/
	30-1-2025
*/

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
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
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = {
    width: typeof window !== 'undefined' 
      ? Math.min(window.innerWidth * 0.7, 280) // Reduced size for mobile
      : 280,
    height: typeof window !== 'undefined' 
      ? Math.min(window.innerWidth * 0.5, 210) // Reduced size for mobile
      : 210
  },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false
}) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
        { 
          id: 1, 
          img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          title: "AI-Powered Code Generation",
          description: "Leverage cutting-edge AI to generate code snippets and get smart suggestions."
        },
        { 
          id: 2, 
          img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          title: "Real-Time Collaboration",
          description: "Work together seamlessly with live code sharing and instant updates."
        },
        { 
          id: 3, 
          img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          title: "Version Control",
          description: "Track changes and maintain code history with built-in version control."
        },
        { 
          id: 4, 
          img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          title: "Code Analytics",
          description: "Get insights into your code quality and team performance."
        }
      ]
  );

  const [activeCard, setActiveCard] = useState(cards[cards.length - 1]);

  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      const newActiveCard = newCards[newCards.length - 1];
      setActiveCard(newActiveCard);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div 
        className="relative w-full"
        style={{
          maxWidth: cardDimensions.width,
          height: cardDimensions.height,
          perspective: 800,
        }}
      >
        {cards.map((card, index) => {
          const randomRotate = randomRotation
            ? Math.random() * 6 - 3 // Reduced rotation range for mobile
            : 0;

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
                  rotateZ: (cards.length - index - 1) * 3 + randomRotate, // Reduced rotation
                  scale: 1 + index * 0.03 - cards.length * 0.03, // Reduced scale difference
                  transformOrigin: "center center", // Changed to center for better mobile display
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
                style={{
                  width: '100%', // Use percentage instead of fixed width
                  height: '100%',
                  maxWidth: cardDimensions.width,
                  maxHeight: cardDimensions.height,
                  pointerEvents: 'auto', // Enable pointer events on container
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
        className="w-full max-w-[280px] sm:max-w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeCard.id}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-xl bg-slate-800/50 p-4 backdrop-blur-sm">
          <h3 className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-2">
            {activeCard.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">
            {activeCard.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}