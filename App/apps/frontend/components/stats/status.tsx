"use client";

import { animate, motion, useMotionValue, useTransform, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null);

  // Trigger only once when visible
  const isInView = useInView(ref, {
    once: true,
    amount: 0.6, // 60% of the element should be visible
  });

  const count = useMotionValue(0);

  const display = useTransform(count, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, value, {
      duration: 1,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  );
}