"use client";
import { motion, useInView } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

interface LinesPullUpProps {
  text: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function LinesPullUp({
  text,
  className,
  containerClassName,
  delay = 0,
  duration = 0.5,
  stagger = 0.15,
}: LinesPullUpProps) {
  const [lines, setLines] = useState<string[][]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const words = text.split(" ");
    const tempLines: string[][] = [];
    let currentLine: string[] = [];
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.style.fontSize = window.getComputedStyle(ref.current).fontSize;
    tempSpan.style.fontFamily = window.getComputedStyle(ref.current).fontFamily;
    document.body.appendChild(tempSpan);

    words.forEach((word) => {
      tempSpan.innerText =
        currentLine.join(" ") + (currentLine.length ? " " : "") + word;
      if (tempSpan.offsetWidth > ref.current!.offsetWidth) {
        tempLines.push([...currentLine]);
        currentLine = [word];
      } else {
        currentLine.push(word);
      }
    });

    if (currentLine.length) tempLines.push([...currentLine]);

    document.body.removeChild(tempSpan);
    setLines(tempLines);
  }, [text]);

  const parentVariants = {
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const pullUpVariant = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: duration, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={containerClassName}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={parentVariants}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden", display: "block" }}>
          <motion.div variants={pullUpVariant} className={className}>
            {line.join(" ")}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
