"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import ClapperboardLoader from "./ClapperboardLoader";

const FRAME_COUNT = 241;
const IMAGES_FOLDER = "/intro-sequence/";
const IMAGE_NAME_PREFIX = "ezgif-frame-";

export default function IntroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll 0-1 to frame index 0-(FRAME_COUNT-1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Opacity transforms

    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                // Format: 001, 002, ..., 192
                const paddedIndex = i.toString().padStart(3, '0');
                img.src = `${IMAGES_FOLDER}${IMAGE_NAME_PREFIX}${paddedIndex}.jpg`;

                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        setLoadedCount(prev => prev + 1);
                        resolve();
                    };
                    img.onerror = () => {
                        // Skip error images but resolve to continue
                        console.warn(`Failed to load frame ${i}`);
                        resolve();
                    }
                });
                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Render frame on canvas
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure index is valid
        const imageIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
        const img = images[imageIndex];

        if (img) {
            // Calculate cover containment
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    // Update canvas on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    // Initial render and resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial sizing

        return () => window.removeEventListener("resize", handleResize);
    }, [images, isLoading]); // Re-run when images are ready

    // Trigger initial frame render when loading is done
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);

    const [showLoader, setShowLoader] = useState(true);

    const [playBurn, setPlayBurn] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLoaderComplete = () => {
        // Start film burn
        setPlayBurn(true);
        // Cut to content halfway through burn (1s for a 2s transition)
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    };

    const handleVideoLoad = () => {
        if (videoRef.current) {
            // Force video length to be exactly 2 seconds
            videoRef.current.playbackRate = videoRef.current.duration / 2;
        }
    };

    // Text Opacities based on frame index
    // Smooth Transition: Solid fades out, revealing the Blended layer underneath
    // Solid: Visible 0-45, Fades out 45-65
    const opacitySolid = useTransform(frameIndex, [0, 45, 65], [1, 1, 0]);

    // Blended: Hidden 0-1, Ready by 45 (Hidden behind Solid), Visible 45+
    const opacityBlended = useTransform(frameIndex, [0, 1, 45], [0, 0, 1]);

    return (
        <div ref={containerRef} className="relative h-[800vh] bg-black">

            {/* Film Burn Overlay - Persists during transition */}
            {playBurn && (
                <div className="fixed inset-0 z-[60] pointer-events-none mix-blend-screen">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={() => setPlayBurn(false)}
                        onLoadedMetadata={handleVideoLoad}
                    >
                        <source src="/assets/filmburn.mp4" type="video/mp4" />
                    </video>
                </div>
            )}

            {showLoader && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <ClapperboardLoader
                        progress={Math.round((loadedCount / FRAME_COUNT) * 100)}
                        onComplete={handleLoaderComplete}
                    />
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Layer 1: Solid Text (No Blend) - Fades OUT */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                    <motion.div
                        style={{ opacity: opacitySolid }}
                        className="text-center"
                    >
                        <h1
                            className="text-3xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] text-center px-4"
                            style={{
                                color: '#ffffff', // White
                            }}
                        >
                            KSHOT BY KSHITIJ
                        </h1>
                        <p
                            className="text-xl md:text-3xl text-white mt-6 font-bold tracking-normal"
                        >
                            Street bred. Cinema fed.
                        </p>
                    </motion.div>
                </div>

                {/* Layer 2: Blended Text (Difference) - Fades IN */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-difference z-10">
                    <motion.div
                        style={{ opacity: opacityBlended }}
                        className="text-center"
                    >
                        <h1
                            className="text-3xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] text-center px-4"
                            style={{
                                color: '#ffffff', // White
                            }}
                        >
                            KSHOT BY KSHITIJ
                        </h1>
                        <p
                            className="text-xl md:text-3xl text-white mt-6 font-bold tracking-normal"
                        >
                            Street bred. Cinema fed.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                {!isLoading && (
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase animate-bounce"
                        style={{ opacity: indicatorOpacity }}
                    >
                        Keep scrolling. It gets real.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
