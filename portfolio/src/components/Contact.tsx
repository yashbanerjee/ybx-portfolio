import { motion } from "framer-motion";
import "./Contact.css";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "X / Twitter", href: "https://x.com" },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <p className="section-label">Next chapter</p>
        {/* The CTA rises out of the depth as you reach the end of the page */}
        <motion.a
          className="contact__cta"
          href="mailto:hello@yash.design"
          initial={{ rotateX: 45, scale: 0.8, opacity: 0, y: 80 }}
          whileInView={{ rotateX: 0, scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="contact__cta-line">Let's make</span>
          <span className="contact__cta-line contact__cta-line--accent">
            something vibrant
          </span>
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
    </section>
  );
}
