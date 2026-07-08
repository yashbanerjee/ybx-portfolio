import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import "./Process.css";

const STEPS = [
  {
    n: "01",
    title: "Listen",
    text: "Deep-dive interviews, data audits and shadowing sessions to understand the real problem — not the assumed one.",
    accent: "#65b30e",
    soft: "#eaf6cf",
  },
  {
    n: "02",
    title: "Frame",
    text: "Translate research into a sharp narrative: who we serve, what changes for them, and how we'll know it worked.",
    accent: "#6c4cf1",
    soft: "#ece7ff",
  },
  {
    n: "03",
    title: "Craft",
    text: "Rapid cycles of prototyping and testing. Systematic components, expressive motion, zero clutter.",
    accent: "#f4502a",
    soft: "#ffe9e1",
  },
  {
    n: "04",
    title: "Ship & Learn",
    text: "Partner with engineering to launch, then measure, iterate and fold learnings back into the system.",
    accent: "#0e9be9",
    soft: "#e1f2fe",
  },
];

/**
 * Stacking deck: each card pins below the header, and as the next one
 * slides up over it the pinned card sinks back — scale down + slight tilt —
 * like a deck of cards being dealt on top of each other.
 */
function StackCard({
  step,
  index,
  count,
  stackProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  count: number;
  stackProgress: MotionValue<number>;
}) {
  const slotRef = useRef<HTMLDivElement>(null);

  /* Entrance: swings up from below like a page turning toward you */
  const { scrollYProgress: enter } = useScroll({
    target: slotRef,
    offset: ["start end", "start 0.45"],
  });
  const rotateX = useTransform(enter, [0, 1], [34, 0]);
  const enterY = useTransform(enter, [0, 1], [60, 0]);

  /* Sink-back while later cards arrive on top */
  const targetScale = 1 - (count - 1 - index) * 0.05;
  const scale = useTransform(stackProgress, [(index + 0.5) / count, 1], [1, targetScale]);
  const rotate = useTransform(
    stackProgress,
    [(index + 0.5) / count, 1],
    [0, index % 2 ? 1.6 : -1.6]
  );

  return (
    <div
      className="process__slot"
      ref={slotRef}
      style={{ top: `calc(16vh + ${index * 2.4}rem)` }}
    >
      <motion.div style={{ rotateX, y: enterY, transformPerspective: 1000 }}>
        <motion.div
          className="process__card"
          style={{
            scale,
            rotate,
            ...({ "--accent": step.accent, "--soft": step.soft } as React.CSSProperties),
          }}
        >
          <div className="process__card-head">
            <span className="process__card-num">{step.n}</span>
            <h3 className="process__card-title">{step.title}</h3>
          </div>
          <p className="process__card-text">{step.text}</p>
          <div className="process__card-orb" aria-hidden />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.6", "end 0.9"],
  });

  return (
    <section className="process" id="process">
      <div className="container">
        <p className="section-label">Process</p>
        <h2 className="process__heading">How the story gets written</h2>
      </div>
      <div className="container process__stack" ref={stackRef}>
        {STEPS.map((s, i) => (
          <StackCard
            key={s.n}
            step={s}
            index={i}
            count={STEPS.length}
            stackProgress={stackProgress}
          />
        ))}
      </div>
    </section>
  );
}
