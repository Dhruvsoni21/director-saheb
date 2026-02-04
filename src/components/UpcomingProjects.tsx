"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import { Project } from "@/lib/store";

export default function UpcomingProjects({ projects }: { projects: Project[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);

    const upcomingProjects = projects.length > 0 ? projects : [
        {
            id: "upcoming-1",
            title: "Coming Soon",
            description: "More amazing projects are on the horizon. Stay tuned.",
            date: "2026",
            color: "bg-neutral-900",
            src: ""
        }
    ];

    // Reset expansion when changing projects
    const handleIndexChange = (newIndex: number) => {
        setCurrentIndex(newIndex);
    };

    const DRAG_BUFFER = 50;

    const onDragEnd = () => {
        const xPos = x.get();
        if (xPos <= -DRAG_BUFFER && currentIndex < upcomingProjects.length - 1) {
            handleIndexChange(currentIndex + 1);
        } else if (xPos >= DRAG_BUFFER && currentIndex > 0) {
            handleIndexChange(currentIndex - 1);
        }
    };

    return (
        <section className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden select-none">
            <div className="container mx-auto px-4">
                <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-12 ml-2">Upcoming Projects</h2>

                <div className="relative w-full max-w-5xl mx-auto">
                    {/* Main Card Area */}
                    <div className="overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-neutral-800 aspect-[9/16] md:aspect-[21/9] shadow-2xl">
                        <motion.div
                            className="flex h-full"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            style={{ x }}
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onDragEnd={onDragEnd}
                        >
                            {upcomingProjects.map((project) => (
                                <div key={project.id} className="min-w-full h-full flex flex-col md:flex-row">
                                    {/* Left: Image Placeholder */}
                                    <div className={`w-full md:w-1/2 h-48 md:h-full ${project.color || 'bg-neutral-900'} flex items-center justify-center relative overflow-hidden group flex-shrink-0`}>
                                        {project.src && project.src !== '/placeholder' ? (
                                            <img
                                                src={project.src}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-black/20" />
                                                <div className="text-9xl font-bold text-white/10 select-none relative z-10">
                                                    {project.date}
                                                </div>
                                            </>
                                        )}
                                        {/* Mock Image Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Right: Content */}
                                    <div className="w-full md:w-1/2 p-5 md:p-12 flex flex-col bg-neutral-900 relative flex-1 min-h-0">
                                        <div className="flex flex-col h-full max-h-full overflow-hidden">
                                            <div className="flex-shrink-0 mb-4 pt-4 md:pt-0">
                                                <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">{project.date}</span>
                                            </div>

                                            <div className="flex-shrink-0 mb-6">
                                                <h3 className="text-3xl md:text-5xl font-extralight text-white leading-tight tracking-tight">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <div
                                                className="flex-grow pr-4 -mr-4 overflow-y-auto custom-scrollbar cursor-auto"
                                                onPointerDown={(e) => e.stopPropagation()}
                                            >
                                                <p className="text-neutral-400 leading-relaxed text-sm md:text-base font-light opacity-90">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dot Navigation */}
                    <div className="flex justify-center mt-8 gap-3">
                        {upcomingProjects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleIndexChange(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-neutral-700 hover:bg-neutral-500"
                                    }`}
                                aria-label={`Go to project ${idx + 1}`}
                                suppressHydrationWarning
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
