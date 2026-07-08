import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import "./About.css";

const STATEMENT: { w: string; accent?: boolean }[] = (
  "I believe great products are stories — every screen a scene, every interaction a plot point. My job is to make sure people never want to put the book down."
)
  .split(" ")
  .map((w) => ({ w, accent: w === "stories" || w === "plot" || w === "point." }));

const STATS = [
  { value: 6, suffix: "", label: "Years designing", accent: "#6c4cf1", soft: "#ece7ff" },
  { value: 6, suffix: "", label: "Countries served", accent: "#f4502a", soft: "#ffe9e1" },
  { value: 14, suffix: "+", label: "Industries", accent: "#0e9be9", soft: "#e1f2fe" },
  { value: null, suffix: "∞", label: "Iterations", accent: "#65b30e", soft: "#eaf6cf" },
];

const CHIP_COLORS = [
  { accent: "#6c4cf1", soft: "#ece7ff" },
  { accent: "#f4502a", soft: "#ffe9e1" },
  { accent: "#65b30e", soft: "#eaf6cf" },
  { accent: "#0e9be9", soft: "#e1f2fe" },
];

const SKILLS = [
  "UI/UX Design",
  "Product Strategy",
  "Design Systems",
  "Wireframing & Prototyping",
  "User & Market Research",
  "Design Roadmapping",
  "Brand & Visual Identity",
  "Front-End Development",
  "Stakeholder Management",
  "Data Analytics",
  "Figma / Adobe Suite",
];

/** Numbers roll up from zero the first time they enter the viewport */
function CountUp({ value, suffix }: { value: number | null; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {value === null ? suffix : `${display}${suffix}`}
    </span>
  );
}

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
                style={
                  { "--accent": s.accent, "--soft": s.soft } as React.CSSProperties
                }
                initial={{ opacity: 0, rotateY: -40, x: -30 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="about__stat-value">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="about__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="about__skills">
            <motion.h3
              className="about__skills-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Toolkit
            </motion.h3>
            <div className="about__skills-list">
              {SKILLS.map((s, i) => {
                const c = CHIP_COLORS[i % CHIP_COLORS.length];
                return (
                  <motion.span
                    key={s}
                    className="about__skill"
                    style={
                      {
                        "--chip": c.accent,
                        "--chip-soft": c.soft,
                        "--tilt": `${i % 2 ? 1.4 : -1.4}deg`,
                      } as React.CSSProperties
                    }
                    initial={{ opacity: 0, scale: 0.4, y: 18 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 18,
                      delay: i * 0.055,
                    }}
                  >
                    {s}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
