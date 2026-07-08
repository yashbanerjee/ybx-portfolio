import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import "./About.css";

const STATEMENT: { w: string; accent?: boolean }[] = (
  "I believe great products are stories — every screen a scene, every interaction a plot point. My job is to make sure people never want to put the book down."
)
  .split(" ")
  .map((w) => ({ w, accent: w === "stories" || w === "plot" || w === "point." }));

const STATS = [
  { value: "6+", label: "Years designing" },
  { value: "20+", label: "Products shipped" },
  { value: "4", label: "Industries" },
  { value: "∞", label: "Iterations" },
];

const SKILLS = [
  "Product Strategy",
  "Interaction Design",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Motion Design",
  "Visual Identity",
  "Figma / Framer",
];

function Word({
  word,
  accent,
  progress,
  range,
}: {
  word: string;
  accent?: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span
      className={`about__word ${accent ? "about__word--accent" : ""}`}
      style={{ opacity, y }}
    >
      {word}&nbsp;
    </motion.span>
  );
}

export default function About() {
  const statementRef = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <section className="about" id="about">
      <div className="container">
        <p className="section-label">About</p>

        {/* Each word inks itself in as the paragraph crosses the viewport */}
        <blockquote className="about__statement" ref={statementRef}>
          {STATEMENT.map((item, i) => (
            <Word
              key={i}
              word={item.w}
              accent={item.accent}
              progress={scrollYProgress}
              range={[i / STATEMENT.length, Math.min(1, i / STATEMENT.length + 0.08)]}
            />
          ))}
        </blockquote>

        <div className="about__grid">
          <div className="about__stats">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="about__stat"
                initial={{ opacity: 0, rotateY: -40, x: -30 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="about__skills"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="about__skills-title">Toolkit</h3>
            <div className="about__skills-list">
              {SKILLS.map((s) => (
                <span key={s} className="about__skill">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
