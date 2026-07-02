"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Card photo that drifts gently as it scrolls through the viewport.
 *  Transform-only (GPU-composited); the image is oversized so the drift
 *  never reveals its edges. */
export function ParallaxShot({
  src,
  alt,
  objectPosition,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="exShot" ref={ref}>
      <motion.div className="exShotInner" style={reduce ? undefined : { y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" style={{ objectPosition }} />
      </motion.div>
    </div>
  );
}
