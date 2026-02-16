"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ClapperboardLoaderProps {
    progress: number; // 0 to 100
    onComplete?: () => void;
}

export default function ClapperboardLoader({ progress, onComplete }: ClapperboardLoaderProps) {
    const controls = useAnimation();
    const hasClapped = useRef(false);

    useEffect(() => {
        // Calculate the angle based on progress. 
        // Arm goes UP (opens) as progress increases.
        // Start: 0deg (Closed) -> End: -60deg (Open)
        const targetAngle = -60 * (progress / 100);

        if (progress < 100) {
            controls.start({ rotate: targetAngle, transition: { type: "spring", stiffness: 100, damping: 20 } });
        } else if (progress >= 100 && !hasClapped.current) {
            // CLAP!
            hasClapped.current = true;
            const clapSequence = async () => {
                // Ensure it's fully open first (optional, but good for consistency)
                await controls.start({ rotate: -40, transition: { duration: 0.1 } });
                // Snap shut (Linear/Sharp for 'clap' effect)
                await controls.start({ rotate: 0, transition: { type: "tween", ease: "circIn", duration: 0.15 } });

                // Wait a moment for the "Action!" to be seen
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 800);
            };
            clapSequence();
        }
    }, [progress, controls, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Clapperboard SVG */}
            <div className="relative w-32 h-32 md:w-48 md:h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    {/* Bottom Slate */}
                    <rect x="10" y="40" width="80" height="50" fill="#1a1a1a" rx="2" />

                    {/* White Striped Area Bottom */}
                    <path d="M10 40 L90 40 L90 55 L10 55 Z" fill="#ffffff" />
                    {/* Stripes on Bottom White Area */}
                    <path d="M25 40 L15 55 M50 40 L40 55 M75 40 L65 55" stroke="#1a1a1a" strokeWidth="8" />

                    {/* Text on Slate */}
                    <text x="50" y="75" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" letterSpacing="1">
                        SCENE 01 | TAKE {Math.floor(progress)}
                    </text>
                    <text x="50" y="85" textAnchor="middle" fill="#666" fontSize="4" fontFamily="monospace">
                        LOADING ASSETS...
                    </text>

                    {/* Top Clapper Arm */}
                    <motion.g
                        initial={{ rotate: 0 }}
                        animate={controls}
                        style={{ originX: 0.1, originY: 0.4 }} // Pivot around the hinge
                    >
                        {/* Arm Body */}
                        <rect x="8" y="22" width="84" height="15" fill="#ffffff" rx="1" transform="rotate(0 10 40)" />

                        {/* Stripes on Arm */}
                        <path d="M25 22 L15 37 M50 22 L40 37 M75 22 L65 37" stroke="#1a1a1a" strokeWidth="8" />
                    </motion.g>

                    {/* Hinge Pin */}
                    <circle cx="12" cy="38" r="2" fill="#888" />
                </svg>
            </div>

            <p className="mt-8 text-white/60 font-mono text-xs tracking-widest uppercase">
                {progress === 100 ? "Action!" : "Adjusting Frames..."}
            </p>
        </div>
    );
}
