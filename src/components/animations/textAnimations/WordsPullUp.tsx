"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface WordsPullUpProps {
    text: string;
    className?: string;
    containerClassName?: string;
    delay: number;
    duration: number;
}

export function WordsPullUp({ text, className, delay, duration, containerClassName }: WordsPullUpProps) {
    const splittedText = text.split(" ");

    const directionMap: Record<string, { x?: number; y?: number; opacity: number }> = {
        top: { y: 24, opacity: 0 },
        bottom: { y: -24, opacity: 0 },
        left: { x: 120, opacity: 0 },
        right: { x: -120, opacity: 0 },
    };

    const pullupVariant = {
        initial: directionMap["top"],
        animate: (i: number) => ({
            x: 0,
            y: 0,
            opacity: 1,
            transition: { delay: (i * 0.5 * 0.1) + delay, duration: duration },
            ease: "easeOut",
        }),
    };

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }} className={containerClassName}>
            {splittedText.map((current: string, i: number) => (
                <div ref={ref} key={i} style={{ overflow: "hidden" }}>
                    <motion.div
                        variants={pullupVariant}
                        initial="initial"
                        animate={isInView ? "animate" : ""}
                        custom={i}
                        className={className}
                    >
                        {current === "" ? <span>&nbsp;</span> : current}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}