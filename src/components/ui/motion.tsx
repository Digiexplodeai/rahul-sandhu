"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const transitionEasings = {
  luxury: [0.22, 1, 0.36, 1] as const, // Soft luxury cubic bezier
  smooth: [0.16, 1, 0.3, 1] as const,
  snappy: [0.2, 0.8, 0.2, 1] as const,
};

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

/* ─── 1. FadeUp ─────────────────────────────────────────────────── */
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 20,
  className = "",
  viewportOnce = true,
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: transitionEasings.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 2. StaggerContainer & StaggerItem ──────────────────────────── */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.05,
  className = "",
  viewportOnce = true,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: viewportOnce, margin: "-30px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yDistance?: number;
}

export function StaggerItem({
  children,
  className = "",
  yDistance = 18,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yDistance },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: transitionEasings.luxury,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── 3. ImageReveal (Soft Mask / Scale entrance) ─────────────────── */
interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: transitionEasings.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 4. ScaleReveal ─────────────────────────────────────────────── */
interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScaleReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
}: ScaleRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: transitionEasings.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 5. SectionEntrance ─────────────────────────────────────────── */
interface SectionEntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionEntrance({
  children,
  className = "",
  delay = 0,
}: SectionEntranceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: transitionEasings.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 6. AnimatedHeading ─────────────────────────────────────────── */
interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: AnimatedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const lines = text.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.65,
              delay: delay + idx * 0.12,
              ease: transitionEasings.luxury,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ─── 7. AnimatedCounter ─────────────────────────────────────────── */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  className = "",
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = React.useState(shouldReduceMotion ? value : 0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let frameId: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
              frameId = requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          frameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [shouldReduceMotion, value, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
