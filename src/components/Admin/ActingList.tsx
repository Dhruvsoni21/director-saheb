"use client";

import { useEffect, useState } from 'react';
import { ActingProject } from '@/lib/store';
import { Trash2, Edit, GripVertical, Save, Film, Instagram } from 'lucide-react';
import { Reorder } from 'framer-motion';

export default function ActingList({ onEdit }: { onEdit?: (p: ActingProject) => void }) {
    const [projects, setProjects] = useState<ActingProject[]>([]);

    const fetchProjects = async () => {
        const res = await fetch('/api/acting');
        if (res.ok) {
            setProjects(await res.json());
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this acting project? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/acting?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchProjects();
            } else {
                alert('Failed to delete acting project');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting acting project');
        }
    };

    const saveOrder = async () => {
        try {
            const res = await fetch('/api/acting', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects),
            });
            if (!res.ok) throw new Error('Failed to save order');
            alert('Order Saved');
        } catch (error) {
            console.error(error);
            alert('Failed to save order');
        }
    };

    return (
        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-light tracking-wider text-neutral-400 uppercase self-start md:self-auto">
                    Acting Projects
                </h2>

                <div className="flex gap-4 self-end md:self-auto">
                    <button onClick={saveOrder} className="text-xs text-white uppercase tracking-widest hover:text-neutral-300 flex items-center gap-1" suppressHydrationWarning>
                        <Save size={14} /> Save Order
                    </button>
                    <button onClick={fetchProjects} className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest" suppressHydrationWarning>Refresh</button>
                </div>
            </div>

            <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="space-y-2">
                {projects.map((project) => (
                    <Reorder.Item key={project.id} value={project}>
                        <div className="flex items-center gap-4 bg-black p-4 rounded border border-neutral-800 group hover:border-neutral-600 transition-colors select-none">
                            {/* Drag Handle */}
                            <div className="cursor-grab active:cursor-grabbing text-neutral-700 hover:text-neutral-500">
                                <GripVertical size={20} />
                            </div>

                            {/* Thumbnail Preview */}
                            <div className="w-16 h-9 bg-neutral-900 overflow-hidden flex-shrink-0 relative rounded">
                                {project.thumbnail ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0.5 right-0.5">
                                            {project.type === 'reel' ? (
                                                <Instagram size={10} className="text-white/80" />
                                            ) : (
                                                <Film size={10} className="text-white/80" />
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                        {project.type === 'reel' ? <Instagram size={16} /> : <Film size={16} />}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium truncate">{project.title}</h3>
                                <div className="flex items-center gap-2 text-neutral-500 text-xs truncate">
                                    {project.category && <span className="text-amber-400">{project.category}</span>}
                                    <span className="text-neutral-700">·</span>
                                    <span className={project.type === 'reel' ? 'text-pink-500/80' : 'text-amber-500/80'}>
                                        {project.type === 'reel' ? '📱 Reel' : '🎭 Acting'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onEdit?.(project)}
                                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                                    title="Edit"
                                    suppressHydrationWarning
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 text-neutral-600 hover:text-red-500 hover:bg-neutral-900 rounded transition-colors"
                                    title="Delete"
                                    suppressHydrationWarning
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {projects.length === 0 && (
                <div className="text-center text-neutral-600 py-8 text-sm">
                    No acting projects yet. Add your first one!
                </div>
            )}
        </div>
    );
}
