import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Loader.css";

const WORDS = ["design", "story", "motion", "craft"];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setGone(true);
          setTimeout(onDone, 700);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const wordIndex = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length));

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="loader__word-mask">
            <motion.span
              key={wordIndex}
              className="loader__word"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {WORDS[wordIndex]}
            </motion.span>
          </div>
          <span className="loader__count">{count}</span>
          <div className="loader__bar">
            <div className="loader__bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
