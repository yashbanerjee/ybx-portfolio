import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import "./Process.css";

const STEPS = [
  {
    n: "01",
    title: "Listen",
    text: "Deep-dive interviews, data audits and shadowing sessions to understand the real problem — not the assumed one.",
    accent: "var(--lime)",
  },
  {
    n: "02",
    title: "Frame",
    text: "Translate research into a sharp narrative: who we serve, what changes for them, and how we'll know it worked.",
    accent: "var(--violet)",
  },
  {
    n: "03",
    title: "Craft",
    text: "Rapid cycles of prototyping and testing. Systematic components, expressive motion, zero clutter.",
    accent: "var(--coral)",
  },
  {
    n: "04",
    title: "Ship & Learn",
    text: "Partner with engineering to launch, then measure, iterate and fold learnings back into the system.",
    accent: "var(--sky)",
  },
];

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const count = STEPS.length;
  const start = index / count;
  const end = (index + 1) / count;

  /* Each card rotates in around Y like a page of a book as the section scrolls */
  const rotateY = useTransform(progress, [start - 0.18, start, end], [55, 0, -8]);
  const x = useTransform(progress, [start - 0.18, start], ["18%", "0%"]);
  const opacity = useTransform(progress, [start - 0.2, start - 0.02], [0, 1]);

  return (
    <motion.div className="process__step" style={{ rotateY, x, opacity }}>
      <span className="process__step-num" style={{ color: step.accent }}>
        {step.n}
      </span>
      <h3 className="process__step-title">{step.title}</h3>
      <p className="process__step-text">{step.text}</p>
      <div className="process__step-glow" style={{ background: step.accent }} />
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.9"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="process" id="process" ref={ref}>
      <div className="container">
        <p className="section-label">Process</p>
        <h2 className="process__heading">How the story gets written</h2>
        <div className="process__track">
          <motion.div className="process__line" style={{ scaleX: lineScale }} />
          <div className="process__steps">
            {STEPS.map((s, i) => (
              <StepCard key={s.n} step={s} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
