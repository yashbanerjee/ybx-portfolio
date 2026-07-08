import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./About.css";

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

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yStatement = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <p className="section-label">About</p>
        <motion.blockquote
          className="about__statement"
          style={{ y: yStatement, rotateX, opacity }}
        >
          I believe great products are <em>stories</em> — every screen a
          scene, every interaction a plot point. My job is to make sure
          people never want to put the book down.
        </motion.blockquote>

        <div className="about__grid">
          <motion.div
            className="about__stats"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>

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
