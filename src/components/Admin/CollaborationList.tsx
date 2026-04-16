"use client";

import { useEffect, useState } from 'react';
import { Collaboration } from '@/lib/store';
import { Trash2, Edit, GripVertical, Save, Instagram } from 'lucide-react';
import { Reorder } from 'framer-motion';

export default function CollaborationList({ onEdit }: { onEdit?: (c: Collaboration) => void }) {
    const [collaborations, setCollaborations] = useState<Collaboration[]>([]);

    const fetchCollaborations = async () => {
        const res = await fetch('/api/collaborations');
        if (res.ok) {
            setCollaborations(await res.json());
        }
    };

    useEffect(() => {
        fetchCollaborations();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this collaboration? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/collaborations?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchCollaborations();
            } else {
                alert('Failed to delete collaboration');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting collaboration');
        }
    };

    const saveOrder = async () => {
        try {
            const res = await fetch('/api/collaborations', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collaborations),
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
                    Collaborations
                </h2>

                <div className="flex gap-4 self-end md:self-auto">
                    <button onClick={saveOrder} className="text-xs text-white uppercase tracking-widest hover:text-neutral-300 flex items-center gap-1" suppressHydrationWarning>
                        <Save size={14} /> Save Order
                    </button>
                    <button onClick={fetchCollaborations} className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest" suppressHydrationWarning>Refresh</button>
                </div>
            </div>

            <Reorder.Group axis="y" values={collaborations} onReorder={setCollaborations} className="space-y-2">
                {collaborations.map((collab) => (
                    <Reorder.Item key={collab.id} value={collab}>
                        <div className="flex items-center gap-4 bg-black p-4 rounded border border-neutral-800 group hover:border-neutral-600 transition-colors select-none">
                            {/* Drag Handle */}
                            <div className="cursor-grab active:cursor-grabbing text-neutral-700 hover:text-neutral-500">
                                <GripVertical size={20} />
                            </div>

                            {/* Thumbnail Preview */}
                            <div className="w-16 h-9 bg-neutral-900 overflow-hidden flex-shrink-0 relative rounded">
                                {collab.thumbnail ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={collab.thumbnail} alt={collab.title} className="w-full h-full object-cover" />
                                        {collab.type === 'instagram' && (
                                            <div className="absolute bottom-0.5 right-0.5">
                                                <Instagram size={10} className="text-white/80" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                        <Instagram size={16} />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium truncate">{collab.title}</h3>
                                <div className="flex items-center gap-2 text-neutral-500 text-xs truncate">
                                    <span className="text-violet-400">{collab.client}</span>
                                    {collab.category && <span>· {collab.category}</span>}
                                    <span className="text-neutral-700">·</span>
                                    <span className={
                                        collab.type === 'instagram' ? 'text-pink-500' :
                                        collab.type === 'video' ? 'text-blue-400' : 'text-emerald-400'
                                    }>
                                        {collab.type === 'instagram' ? '📱 Reel' : collab.type === 'video' ? '🎬 Video' : '🖼️ Image'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onEdit?.(collab)}
                                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                                    title="Edit"
                                    suppressHydrationWarning
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(collab.id)}
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

            {collaborations.length === 0 && (
                <div className="text-center text-neutral-600 py-8 text-sm">
                    No collaborations yet. Add your first one!
                </div>
            )}
        </div>
    );
}
