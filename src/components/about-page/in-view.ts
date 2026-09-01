import type { UseInViewOptions } from "motion/react";

/** Animate only after the block has moved well up into the viewport. */
export const aboutViewport: UseInViewOptions = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -22% 0px",
};
