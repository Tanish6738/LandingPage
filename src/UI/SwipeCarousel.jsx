import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = ({ children }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setItemIndex((pv) => {
          if (pv === childrenArray.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [childrenArray.length]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && itemIndex < childrenArray.length - 1) {
      setItemIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && itemIndex > 0) {
      setItemIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-transparent py-8 w-[95%] mx-auto">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${itemIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        {childrenArray.map((child, idx) => (
          <motion.div
            key={idx}
            animate={{
              scale: itemIndex === idx ? 1 : 0.9,
              opacity: itemIndex === idx ? 1 : 0.3,
            }}
            transition={{
              ...SPRING_OPTIONS,
              opacity: { duration: 0.4 }
            }}
            className="w-full shrink-0 px-4"
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      <Dots itemIndex={itemIndex} setItemIndex={setItemIndex} count={childrenArray.length} />
      <GradientEdges />
    </div>
  );
};

const Dots = ({ itemIndex, setItemIndex, count }) => {
  return (
    <div className="mt-8 flex w-full justify-center gap-3">
      {Array.from({ length: count }).map((_, idx) => (
        <motion.button
          key={idx}
          onClick={() => setItemIndex(idx)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
            idx === itemIndex 
              ? "bg-teal-500 shadow-lg shadow-teal-500/50" 
              : "bg-slate-600 hover:bg-slate-500"
          }`}
        />
      ))}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[15vw] max-w-[150px] bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[15vw] max-w-[150px] bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />
    </>
  );
};