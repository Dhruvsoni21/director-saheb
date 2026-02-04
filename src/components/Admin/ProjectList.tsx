"use client";

import { useEffect, useState } from 'react';
import { Project } from '@/lib/store';
import { Trash2, Film, Star, Edit, GripVertical, Save } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProjectList({ onEdit }: { onEdit?: (p: Project) => void }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeTab, setActiveTab] = useState<'standard' | 'upcoming'>('standard');

    const fetchProjects = async () => {
        const res = await fetch('/api/projects');
        if (res.ok) {
            setProjects(await res.json());
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        if (activeTab === 'upcoming') {
            return p.isUpcoming === true;
        }
        return !p.isUpcoming;
    });

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchProjects();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting project');
        }
    };

    const handleToggleHighlight = async (project: Project) => {
        try {
            const updated = { ...project, featured: !project.featured };
            // Optimistic update
            setProjects(projects.map(p => p.id === project.id ? updated : p));

            const res = await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });

            if (!res.ok) throw new Error('Failed to update');
        } catch (error) {
            console.error(error);
            alert('Failed to update highlight status');
            fetchProjects(); // Revert
        }
    };

    const handleReorder = (newOrder: Project[]) => {
        // We only reorder the currently visible subset
        // We need to merge this new order back into the main projects list
        const otherProjects = projects.filter(p => activeTab === 'upcoming' ? !p.isUpcoming : p.isUpcoming);
        setProjects([...otherProjects, ...newOrder]);
    };

    const saveOrder = async () => {
        try {
            const res = await fetch('/api/projects', {
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

    // Reorder Item Component to isolate drag controls if needed, 
    // but usually Reorder.Item handles it. 
    // We'll wrap the list in Reorder.Group.

    return (
        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <h2 className="text-xl font-light tracking-wider text-neutral-400 uppercase self-start md:self-auto">Library</h2>
                    <div className="flex bg-black rounded p-1 border border-neutral-800 w-fit mx-auto md:mx-0">
                        <button
                            onClick={() => setActiveTab('standard')}
                            className={cn(
                                "px-3 py-1 text-xs uppercase tracking-widest rounded transition-colors",
                                activeTab === 'standard' ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
                            )}
                            suppressHydrationWarning
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                "px-3 py-1 text-xs uppercase tracking-widest rounded transition-colors",
                                activeTab === 'upcoming' ? "bg-amber-900/30 text-amber-500" : "text-neutral-500 hover:text-white"
                            )}
                            suppressHydrationWarning
                        >
                            Upcoming
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 self-end md:self-auto">
                    <button onClick={saveOrder} className="text-xs text-white uppercase tracking-widest hover:text-neutral-300 flex items-center gap-1" suppressHydrationWarning>
                        <Save size={14} /> Save Order
                    </button>
                    <button onClick={fetchProjects} className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest" suppressHydrationWarning>Refresh</button>
                </div>
            </div>

            <Reorder.Group axis="y" values={filteredProjects} onReorder={handleReorder} className="space-y-2">
                {filteredProjects.map((project) => (
                    <Reorder.Item key={project.id} value={project}>
                        <div className="flex items-center gap-4 bg-black p-4 rounded border border-neutral-800 group hover:border-neutral-600 transition-colors select-none">
                            {/* Drag Handle */}
                            <div className="cursor-grab active:cursor-grabbing text-neutral-700 hover:text-neutral-500">
                                <GripVertical size={20} />
                            </div>

                            <div className="w-16 h-9 bg-neutral-900 overflow-hidden flex-shrink-0 relative">
                                {project.type === 'image' || project.isUpcoming ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                        <Film size={16} />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium truncate">{project.title}</h3>
                                <div className="flex items-center gap-2 text-neutral-500 text-xs truncate">
                                    <span>{project.category || project.date || 'No details'}</span>
                                    {project.featured && <span className="text-yellow-500">★ Featured</span>}
                                    {project.isUpcoming && <span className="text-amber-500">⏳ Upcoming</span>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggleHighlight(project)}
                                    className={cn("p-2 rounded hover:bg-neutral-900 transition-colors", project.featured ? "text-yellow-500" : "text-neutral-600 hover:text-white")}
                                    title="Toggle Highlight"
                                    suppressHydrationWarning
                                >
                                    <Star size={16} fill={project.featured ? "currentColor" : "none"} />
                                </button>
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

            {filteredProjects.length === 0 && (
                <div className="text-center text-neutral-600 py-8 text-sm">
                    No {activeTab} projects found.
                </div>
            )}
        </div>
    );
}
