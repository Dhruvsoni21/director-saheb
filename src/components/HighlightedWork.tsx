"use client";

import { Project } from "@/lib/store";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function HighlightedWork({ projects, onOpenProject }: { projects: Project[], onOpenProject: (p: Project) => void }) {
    if (projects.length === 0) return null;

    return (
        <section className="py-24 bg-neutral-950 border-t border-white/10">
            <div className="container mx-auto px-4">
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-12 ml-2">Becoming</h2>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-4 md:gap-16 items-center`}
                        >
                            {/* Media */}
                            <div
                                onClick={() => onOpenProject(project)}
                                className="w-[55%] md:w-2/3 aspect-video bg-white/5 relative group overflow-hidden cursor-pointer"
                            >
                                {project.type === 'image' || project.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={project.thumbnail || project.src}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/10">
                                        <Play className="text-white/20" size={64} />
                                    </div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Info */}
                            <div className="w-[45%] md:w-1/3 text-left">
                                <h3 className="text-lg md:text-5xl font-light mb-2 md:mb-4 leading-tight">{project.title}</h3>
                                <p className="text-white/60 mb-4 text-xs md:text-sm leading-relaxed hidden md:block">
                                    {project.description}
                                </p>
                                <button
                                    onClick={() => onOpenProject(project)}
                                    className="inline-block border border-white/20 px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                                >
                                    View Project
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
