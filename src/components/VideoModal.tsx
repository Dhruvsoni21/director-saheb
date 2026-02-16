"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { Project } from "@/lib/store";
import { useState } from "react";

const getEmbedUrl = (url: string) => {
    try {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            // Handle Shorts
            if (url.includes('/shorts/')) {
                videoId = url.split('/shorts/')[1].split('?')[0]; // simple extraction
            }
            // Handle Short Link (youtu.be)
            else if (url.includes('youtu.be')) {
                videoId = url.split('/').pop()?.split('?')[0] || '';
            }
            // Handle Standard Link (v=...)
            else {
                const urlParams = new URLSearchParams(new URL(url).search);
                videoId = urlParams.get('v') || '';
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
        }
        if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : null;
        }
        if (url.includes('instagram.com')) {
            // Handle /reel/ID/ and /p/ID/
            const match = url.match(/(?:reel|p)\/([^/?]+)/);
            const videoId = match ? match[1] : null;
            return videoId ? `https://www.instagram.com/p/${videoId}/embed` : null;
        }
    } catch (e) {
        return null;
    }
    return null;
};

export default function VideoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Reset playing state when project changes
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
            >
                <X size={32} />
            </button>

            <div className="w-full max-w-7xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl bg-neutral-900 border border-white/10 p-6 md:p-8 relative">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                    {/* Media Container */}
                    <div className="flex-1 w-full relative group overflow-hidden rounded-lg bg-black aspect-video shadow-2xl">
                        {project.type === 'video' ? (
                            getEmbedUrl(project.src) ? (
                                <iframe
                                    src={getEmbedUrl(project.src) || ''}

                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={project.title}
                                    className="w-full h-full"
                                />
                            ) : (
                                <video
                                    src={project.src}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            )
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={project.src}
                                alt={project.title}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-medium text-white mb-2">{project.title}</h2>
                            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-white/50 mb-4">
                                <span className="px-2 py-1 bg-white/10 rounded">{project.category}</span>
                                <span className="px-2 py-1 bg-white/10 rounded">{project.date ? new Date(project.date).getFullYear() : '2025'}</span>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-white/10 my-1 lg:hidden" />

                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
