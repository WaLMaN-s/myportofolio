"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ARCH = `
                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/
`;

const GRADIENT =
  "linear-gradient(115deg, #10b981, #06b6d4, #3b82f6, #a855f7, #ec4899, #f97316, #10b981)";

// One aurora loop takes ~11s; hover speeds it up smoothly via speedRef
const LOOP_SECONDS = 11;

export default function AsciiLogo() {
  const mainRef = useRef<HTMLPreElement>(null);
  const glowRef = useRef<HTMLPreElement>(null);
  const speedRef = useRef(1);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    speedRef.current = hovered ? 1.6 : 1;
  }, [hovered]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let theta = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      theta += dt * ((2 * Math.PI) / LOOP_SECONDS) * speedRef.current;
      // sinusoidal ping-pong keeps the loop seamless (no gradient seam jump)
      const x = ((1 - Math.cos(theta)) / 2) * 100;
      const pos = `${x}% 50%`;
      if (mainRef.current) mainRef.current.style.backgroundPosition = pos;
      if (glowRef.current) glowRef.current.style.backgroundPosition = pos;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const gradientText = {
    backgroundImage: GRADIENT,
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontSize: "clamp(0.42rem, 1.5vw, 0.72rem)",
    lineHeight: 1.2,
  } as const;

  const still = { x: 0, y: 0, rotate: 0, opacity: 1 };
  // different periods per axis give an organic drift instead of a metronome bob
  const drift = {
    y: [0, -5, 0, 3, 0],
    x: [0, 2.5, 0, -2.5, 0],
    rotate: [0, 0.6, 0, -0.6, 0],
    opacity: [1, 0.96, 1],
  };
  const driftTransition = {
    y: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
    x: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
    rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" as const },
    opacity: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const },
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduced || hovered ? still : drift}
      transition={
        reduced || hovered
          ? { duration: 0.6, ease: "easeOut" }
          : driftTransition
      }
      className="ascii-stage relative mx-auto w-fit select-none p-4 md:mx-0"
    >
      <pre
        ref={glowRef}
        aria-hidden="true"
        style={gradientText}
        className={`absolute inset-4 whitespace-pre font-mono blur-[16px] transition-opacity duration-500 ${
          hovered ? "opacity-50" : "opacity-25"
        }`}
      >
        {ARCH}
      </pre>
      <pre
        ref={mainRef}
        aria-hidden="true"
        style={gradientText}
        className="relative whitespace-pre font-mono"
      >
        {ARCH}
      </pre>
      <pre
        aria-hidden="true"
        className="ascii-shimmer absolute inset-4 whitespace-pre font-mono"
        style={{ fontSize: gradientText.fontSize, lineHeight: 1.2 }}
      >
        {ARCH}
      </pre>
    </motion.div>
  );
}
