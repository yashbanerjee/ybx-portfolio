import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLenis } from "../hooks/useLenis";
import "./Nav.css";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    const el = document.querySelector(href);
    if (lenis && el) {
      lenis.scrollTo(el as HTMLElement, { offset: -20 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        className="nav__logo"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          getLenis()?.scrollTo(0);
        }}
      >
        yash<span className="nav__logo-dot">.</span>
      </a>
      <nav className="nav__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav__link" onClick={goTo(l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="nav__cta" href="mailto:hello@yash.design">
        Let's talk
      </a>
    </motion.header>
  );
}
