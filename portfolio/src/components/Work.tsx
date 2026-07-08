import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { projects, type Project } from "../data/projects";
import "./Work.css";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

/** Shared card body with cursor-tracking tilt */
function CardBody({ project }: { project: Project }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 180, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 5);
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 7);
  };
  const onMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      className="gcard"
      style={{
        rotateX: springX,
        rotateY: springY,
        ...({
          "--accent": project.accent,
          "--accent-soft": project.accentSoft,
        } as React.CSSProperties),
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="gcard__visual">
        <span className="gcard__index">{project.index}</span>
        <div className="gcard__orb" />
        <div className="gcard__grid-lines" aria-hidden />
      </div>
      <div className="gcard__info">
        <div className="gcard__info-head">
          <h3 className="gcard__title">{project.title}</h3>
          <span className="gcard__year">{project.year}</span>
        </div>
        <p className="gcard__tagline">{project.tagline}</p>
        <p className="gcard__desc">{project.description}</p>
        <div className="gcard__tags">
          {project.tags.map((t) => (
            <span key={t} className="gcard__tag">
              {t}
            </span>
          ))}
        </div>
        <div className="gcard__footer">
          <span className="gcard__role">{project.role}</span>
          <span className="gcard__link">
            View case study <span className="gcard__link-arrow">→</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Coverflow shuffle: every card is anchored to the center of the stage.
 * `d` is the card's signed distance from the active position — 0 means
 * front-and-center; ±1 means one step off, peeking in from the side,
 * scaled down and angled inward toward the middle.
 */
function GallerySlide({
  project,
  index,
  count,
  progress,
}: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const dist = (p: number) => p * (count - 1) - index;

  const x = useTransform(progress, (p) => `${-dist(p) * 58}vw`);
  const rotateY = useTransform(progress, (p) => -clamp(dist(p), -1, 1) * 26);
  const scale = useTransform(progress, (p) => 1 - Math.min(Math.abs(dist(p)), 1) * 0.14);
  const slideOpacity = useTransform(
    progress,
    (p) => 1 - Math.min(Math.abs(dist(p)), 1.4) * 0.4
  );
  const zIndex = useTransform(progress, (p) => Math.round(100 - Math.abs(dist(p)) * 10));

  return (
    <motion.div
      className="work__slide"
      style={{ x, rotateY, scale, opacity: slideOpacity, zIndex }}
    >
      <CardBody project={project} />
    </motion.div>
  );
}

function HorizontalGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Page pins, the deck shuffles through the center */
  const trackProgress = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);

  return (
    <section className="work" id="work" ref={ref}>
      <div className="work__pin">
        <header className="work__header container">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="work__heading">
              Stories told through <em>pixels &amp; motion</em>
            </h2>
          </div>
          <span className="work__hint">Keep scrolling — the deck shuffles through</span>
        </header>
        <div className="work__stage">
          {projects.map((p, i) => (
            <GallerySlide
              key={p.id}
              project={p}
              index={i}
              count={projects.length}
              progress={trackProgress}
            />
          ))}
        </div>
        <div className="work__progress container">
          <span className="work__progress-num">01</span>
          <div className="work__progress-bar">
            <motion.div className="work__progress-fill" style={{ scaleX: trackProgress }} />
          </div>
          <span className="work__progress-num">0{projects.length}</span>
        </div>
      </div>
    </section>
  );
}

function VerticalList() {
  return (
    <section className="work work--stacked" id="work">
      <header className="work__header container">
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="work__heading">
            Stories told through <em>pixels &amp; motion</em>
          </h2>
        </div>
      </header>
      <div className="work__vlist container">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 70, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardBody project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Work() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HorizontalGallery /> : <VerticalList />;
}
