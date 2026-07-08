import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { projects, type Project } from "../data/projects";
import "./Work.css";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  /* --- Scroll-driven 3D entrance & exit --- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateXScroll = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [32, 0, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [0.85, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.35]);
  const z = useTransform(scrollYProgress, [0, 0.35], [-160, 0]);

  /* --- Hover tilt --- */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 7);
    tiltY.set(px * 9);
  };
  const onMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="project" ref={ref}>
      <motion.article
        className="project__card"
        style={{
          rotateX: rotateXScroll,
          scale,
          opacity,
          z,
          ...({
            "--accent": project.accent,
            "--accent-soft": project.accentSoft,
          } as React.CSSProperties),
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          className="project__card-inner"
          style={{ rotateX: springTiltX, rotateY: springTiltY }}
        >
          <div className="project__visual">
            <span className="project__index">{project.index}</span>
            <div className="project__orb" />
            <div className="project__grid-lines" aria-hidden />
          </div>

          <div className="project__info">
            <div className="project__info-head">
              <h3 className="project__title">{project.title}</h3>
              <span className="project__year">{project.year}</span>
            </div>
            <p className="project__tagline">{project.tagline}</p>
            <p className="project__desc">{project.description}</p>
            <div className="project__tags">
              {project.tags.map((t) => (
                <span key={t} className="project__tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="project__footer">
              <span className="project__role">{project.role}</span>
              <span className="project__link">
                View case study <span className="project__link-arrow">→</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.article>
      {index === 0 && null}
    </div>
  );
}

export default function Work() {
  return (
    <section className="work container" id="work">
      <header className="work__header">
        <p className="section-label">Selected Work</p>
        <h2 className="work__heading">
          Stories told through <em>pixels &amp; motion</em>
        </h2>
      </header>
      <div className="work__list">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
