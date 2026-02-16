"use client";

import { Project } from "@/lib/store";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProjectGrid({ projects, onOpenProject }: { projects: Project[], onOpenProject: (p: Project) => void }) {
    // Strictly filter out upcoming projects to ensure this component ONLY shows archive/standard projects
    const displayProjects = projects.filter(p => !p.isUpcoming);

    if (displayProjects.length === 0) return null;

    return (
        <section className="py-24 bg-black border-t border-neutral-900">
            <div className="container mx-auto px-4">
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-12 ml-2">Elsewhere</h2>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 custom-scrollbar">
                    {displayProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer group min-w-[85vw] md:min-w-[450px] lg:min-w-[500px] snap-center"
                            onClick={() => onOpenProject(project)}
                        >
                            <div className={cn("bg-neutral-900 overflow-hidden relative mb-4", "aspect-video")}>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />

                                {project.type === 'video' && project.thumbnail || project.type === 'image' ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={project.thumbnail || project.src}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <span className="uppercase tracking-widest text-xs">Video</span>
                                    </div>
                                )}

                                {/* Play Icon for Video */}
                                {project.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-white text-sm uppercase tracking-widest font-primary group-hover:text-white/70 transition-colors">{project.title}</h3>
                                    <p className="text-white/60 text-xs mt-1">{project.category}</p>
                                </div>
                                <span className="text-white/40 text-xs">
                                    {project.date ? new Date(project.date).getFullYear() : '2025'}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
