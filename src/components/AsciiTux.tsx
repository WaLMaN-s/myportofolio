"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TUX = String.raw`
        a8888b.
       d888888b.
       8P"YP"Y88
       8|o||o|88
       8'    .88
       8'---.Y8.
      d/      '8b.
     dP   .    Y8b.
    d8:'  "  '::88b
   d8"         'Y88b
  :8P    '      :888
   8a.   :     _a88P
 ._/"Yaa_:   .| 88P|
 \    YP"    '| 8P  '.
 /     \.___.d|    .'
 '--..__)8888P'._.'
`;

const GRADIENT =
  "linear-gradient(115deg, #10b981, #06b6d4, #3b82f6, #a855f7, #ec4899, #f97316, #10b981)";

// One aurora loop takes ~13s; hover speeds it up smoothly via speedRef
const LOOP_SECONDS = 13;

export default function AsciiTux() {
  const mainRef = useRef<HTMLPreElement>(null);
  const glowRef = useRef<HTMLPreElement>(null);
  const speedRef = useRef(1);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    speedRef.current = hovered ? 1.5 : 1;
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
    fontSize: "clamp(0.55rem, 2.4vw, 1rem)",
    lineHeight: 1.15,
  } as const;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={
        reduced || hovered
          ? { y: 0, opacity: 1 }
          : { y: [0, -3, 0], opacity: [1, 0.96, 1] }
      }
      transition={
        reduced || hovered
          ? { duration: 0.6, ease: "easeOut" }
          : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
      }
      className="tux-stage relative mx-auto w-fit select-none p-4 md:mx-0"
    >
      <pre
        ref={glowRef}
        aria-hidden="true"
        style={gradientText}
        className={`absolute inset-4 whitespace-pre font-mono blur-[16px] transition-opacity duration-500 ${
          hovered ? "opacity-50" : "opacity-25"
        }`}
      >
        {TUX}
      </pre>
      <pre
        ref={mainRef}
        aria-hidden="true"
        style={gradientText}
        className="relative whitespace-pre font-mono"
      >
        {TUX}
      </pre>
      <pre
        aria-hidden="true"
        className="tux-shimmer absolute inset-4 whitespace-pre font-mono"
        style={{ fontSize: gradientText.fontSize, lineHeight: 1.15 }}
      >
        {TUX}
      </pre>
    </motion.div>
  );
}
