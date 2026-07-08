/**
 * Shared mutable scroll state, written by the Lenis scroll handler and
 * read every frame inside the R3F render loop (avoids React re-renders).
 */
export const scrollState = {
  /** 0 → 1 across the whole page */
  progress: 0,
  /** smoothed scroll velocity, roughly -1 → 1 */
  velocity: 0,
  /** normalized mouse, -1 → 1 */
  mouseX: 0,
  mouseY: 0,
};
