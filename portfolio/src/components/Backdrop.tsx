import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A fixed layer behind everything whose color slowly morphs as you travel
 * through the page — warm paper deepening into violet tints and back.
 * Gives the scroll a cinematic sense of place without breaking the palette.
 */
export default function Backdrop() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#f7f5f0", "#f2effc", "#eae4fb", "#f2effc", "#f7f5f0"]
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
