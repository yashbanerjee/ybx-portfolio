import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Contact.css";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "X / Twitter", href: "https://x.com" },
];

const ctaLine = {
  hidden: { y: "112%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });

  /* The violet panel unfolds from a rounded card into a full-bleed scene */
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <section className="contact" id="contact" ref={ref}>
      <motion.div className="contact__panel" style={{ scale, borderRadius: radius }}>
        <div className="container contact__inner">
          <p className="contact__label">Next chapter</p>
          <motion.a
            className="contact__cta"
            href="mailto:hello@yash.design"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {["Let's make", "something vibrant"].map((text, i) => (
              <span className="contact__cta-mask" key={text}>
                <motion.span
                  className={`contact__cta-line ${i === 1 ? "contact__cta-line--accent" : ""}`}
                  variants={ctaLine}
                  custom={i}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.a>
          <p className="contact__note">
            Open to full-time roles and select freelance collaborations for 2026.
          </p>
          <div className="contact__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="contact__social"
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
        <footer className="contact__footer container">
          <span>© 2026 Yash — Product Designer</span>
          <span>Designed & built with care (and a lot of coffee)</span>
        </footer>
      </motion.div>
    </section>
  );
}
