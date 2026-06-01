"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ActingVideoModal from "./ActingVideoModal";
import type { ActingProject } from "@/lib/store";

// ─── Film Strip Icon ────────────────────────────────────────────────────
function FilmStripIcon({ className }: { className?: string }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="2" x2="6" y2="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="18" y1="2" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="17" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" />
            <line x1="18" y1="17" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

// ─── Instagram SVG Icon ─────────────────────────────────────────────────
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                fill="currentColor"
            />
        </svg>
    );
}

// ─── Acting Card ────────────────────────────────────────────────────────
function ActingCard({
    project,
    index,
    onOpen,
}: {
    project: ActingProject;
    index: number;
    onOpen: (p: ActingProject) => void;
}) {
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-5%" }}
            className="group cursor-pointer"
            onClick={() => onOpen(project)}
        >
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Lazy-loaded Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        onLoad={() => setIsImgLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.6] ${isImgLoaded ? "opacity-100" : "opacity-0"}`}
                    />

                    {/* Skeleton while loading */}
                    {!isImgLoaded && (
                        <div className="absolute inset-0 bg-white/5 animate-pulse" />
                    )}

                    {/* Persistent subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Hover dark overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Play Button — Centered */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border border-white/25 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110">
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1 drop-shadow-md" />
                        </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {project.type === 'reel' ? <InstagramIcon className="text-white/90" /> : <FilmStripIcon className="text-white/90" />}
                        <span className="text-white/80 text-[9px] leading-none tracking-widest uppercase font-medium translate-y-[0.5px]">
                            {project.type === 'reel' ? 'Reel' : 'Acting'}
                        </span>
                    </div>

                    {/* Category Pill — Bottom Left */}
                    {project.category && (
                        <div className="absolute bottom-3 left-3 px-3 py-1 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                            <span className="text-white/80 text-[9px] leading-none tracking-widest uppercase font-medium translate-y-[0.5px]">
                                {project.category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-medium text-white mb-1 tracking-tight truncate group-hover:text-white/90 transition-colors">
                                {project.title}
                            </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M4 12L12 4M12 4H5M12 4V11"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Section Title ──────────────────────────────────────────────────────
function SectionTitle() {
    return (
        <div className="mb-16 md:mb-20">
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6 ml-0.5"
            >
                On Screen
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight leading-[1.1]"
            >
                Acting
                <span className="block text-white/30 text-xl md:text-3xl lg:text-4xl font-light mt-2 tracking-normal">
                    & Performances
                </span>
            </motion.h2>

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-16 h-[1px] bg-gradient-to-r from-white/40 to-transparent mt-8 origin-left"
            />
        </div>
    );
}

// ─── Main Section Component ─────────────────────────────────────────────
export default function ActingSection() {
    const [selectedProject, setSelectedProject] = useState<ActingProject | null>(null);
    const [actingProjects, setActingProjects] = useState<ActingProject[]>([]);

    // Fetch acting projects from API
    useEffect(() => {
        const fetchActing = async () => {
            try {
                const res = await fetch('/api/acting');
                if (res.ok) {
                    const data: ActingProject[] = await res.json();
                    setActingProjects(data);
                }
            } catch (err) {
                console.error('Failed to fetch acting projects:', err);
            }
        };
        fetchActing();
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    // Don't render section if there are no acting projects
    if (actingProjects.length === 0) return null;

    return (
        <>
            <section
                id="acting-section"
                className="relative py-24 md:py-32 bg-neutral-950 border-t border-white/[0.06] overflow-hidden"
            >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <SectionTitle />

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {actingProjects.map((project, index) => (
                            <ActingCard
                                key={project.id}
                                project={project}
                                index={index}
                                onOpen={setSelectedProject}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Acting Video Modal */}
            <ActingVideoModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}
