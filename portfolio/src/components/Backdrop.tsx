import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A fixed layer behind everything whose color slowly morphs as you travel
 * through the page — warm paper → lime tint → violet tint → coral tint →
 * sky tint → back to paper. Gives the scroll a cinematic sense of place.
 */
export default function Backdrop() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.6, 0.78, 1],
    ["#f7f5f0", "#f0f4df", "#edeafb", "#fdeee7", "#e7f3fc", "#f7f5f0"]
  );

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor,
      }}
    />
  );
}
