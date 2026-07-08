import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

const line = {
  hidden: { y: "115%", rotateX: -45 },
  show: (i: number) => ({
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* The whole hero tilts back and sinks into 3D space as you scroll away */
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__inner container" style={{ rotateX, scale, y, opacity }}>
        <motion.p
          className="hero__eyebrow section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          Yash — Product Designer
        </motion.p>

        <h1 className="hero__title" aria-label="I design products that tell stories">
          {["I design", "products that", "tell stories."].map((text, i) => (
            <span className="hero__line-mask" key={text}>
              <motion.span
                className={`hero__line ${i === 2 ? "hero__line--accent" : ""}`}
                variants={line}
                custom={i}
                initial="hidden"
                animate={started ? "show" : "hidden"}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          Product designer with 6+ years turning complex problems into vibrant,
          human experiences — across health, fintech and commerce.
        </motion.p>

        <motion.div
          className="hero__meta"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span>Based in India</span>
          <span className="hero__meta-divider" />
          <span>Available for 2026</span>
          <span className="hero__meta-divider" />
          <span className="hero__scroll-hint">Scroll to explore ↓</span>
        </motion.div>
      </motion.div>

      <div className="hero__marquee" aria-hidden>
        <div className="hero__marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="hero__marquee-content">
              product design · interaction · design systems · motion · storytelling ·
              prototyping · research ·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
