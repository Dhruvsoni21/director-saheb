"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";

export interface FeaturedProject {
    id: string;
    title: string;
    client: string;
    description: string;
    type: "instagram" | "video" | "image";
    thumbnail: string;
    external_url: string;
    category?: string;
}

export default function ReelModal({
    project,
    onClose,
}: {
    project: FeaturedProject | null;
    onClose: () => void;
}) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="reel-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-[210] w-10 h-10 rounded-full bg-black/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-black transition-all duration-300 cursor-pointer shadow-xl"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                    {/* Modal Content */}
                    <motion.div
                        key="reel-modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay: 0.05,
                        }}
                        className="relative w-full max-w-2xl z-[205]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                            {/* Reel Preview */}
                            <div className="relative aspect-[9/14] max-h-[55vh] w-full overflow-hidden bg-black">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                                {/* Play Circle Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <a
                                        href={project.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/play flex flex-col items-center gap-4"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover/play:scale-110 group-hover/play:bg-white/25 group-hover/play:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1.5 drop-shadow-lg" />
                                        </div>
                                        <span className="text-white/60 text-xs tracking-widest uppercase group-hover/play:text-white/90 transition-colors">
                                            Play Reel
                                        </span>
                                    </a>
                                </div>

                                {/* Instagram Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-white/80"
                                    >
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="text-white/70 text-[10px] leading-none tracking-wider uppercase font-medium translate-y-[0.5px]">
                                        Reel
                                    </span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6 md:p-8 space-y-5">
                                {/* Title & Client */}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-medium text-white mb-1.5 tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/50 text-sm font-light tracking-wide">
                                        {project.client}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={project.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group/cta"
                                    >
                                        Watch on Instagram
                                        <ArrowUpRight
                                            size={16}
                                            className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                                        />
                                    </a>
                                    <button
                                        onClick={onClose}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white/80 px-6 py-3 rounded-xl text-sm border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                                    >
                                        <ExternalLink size={14} />
                                        View Project Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
