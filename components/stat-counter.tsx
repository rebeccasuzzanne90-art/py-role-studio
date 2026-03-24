"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatCounter({ value, label, prefix, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold sm:text-4xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm opacity-70">{label}</p>
    </div>
  );
}
