"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/store';

interface ProjectFormProps {
    initialData?: Project | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function ProjectForm({ initialData, onCancel, onSuccess }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);



    // Set default values for initial render to avoid hydration mismatch
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'video', // 'video' | 'image'
        category: '',
        featured: false,
        externalLink: '',
        thumbnail: '',
        isUpcoming: false,
        date: '', // Empty initially, set in useEffect
        color: 'bg-neutral-900'
    });

    useEffect(() => {
        const currentYear = new Date().getFullYear().toString();

        if (!initialData) {
            setFormData(prev => ({
                ...prev,
                date: currentYear
            }));
        }
    }, [initialData]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                type: initialData.type as string, // Cast to string to avoid strict enum issues during migration if any old data exists
                category: initialData.category || '',
                featured: initialData.featured,
                externalLink: initialData.src,
                thumbnail: initialData.thumbnail || '',
                isUpcoming: initialData.isUpcoming || false,
                date: initialData.date || new Date().getFullYear().toString(),
                color: initialData.color || 'bg-neutral-900',
            });
            setThumbnailFile(null);
        } else {
            // Reset
            setFormData({
                title: '',
                description: '',
                type: 'video',
                category: '',
                featured: false,
                externalLink: '',
                thumbnail: '',
                isUpcoming: false,
                date: new Date().getFullYear().toString(),
                color: 'bg-neutral-900',
            });
            setThumbnailFile(null);
        }
    }, [initialData]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let thumbnailUrl = formData.thumbnail;
            let src = formData.externalLink;

            // Upload File (Thumbnail for Standard OR Main Image for Upcoming)
            if (thumbnailFile) {
                const uploadData = new FormData();
                uploadData.append('file', thumbnailFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                if (!uploadRes.ok) throw new Error('Upload failed');
                const uploadJson = await uploadRes.json();

                if (formData.isUpcoming) {
                    src = uploadJson.url; // Use as main src for upcoming
                } else {
                    thumbnailUrl = uploadJson.url; // Use as thumbnail for standard
                }
            }

            const method = initialData ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                src: src || (formData.isUpcoming ? '/placeholder' : ''),
                thumbnail: thumbnailUrl,
                id: initialData ? initialData.id : undefined,
            };

            if (initialData) {
                payload.id = initialData.id;
            }

            const res = await fetch('/api/projects', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Action failed');

            router.refresh();
            onSuccess();
            if (!initialData) {
                setFormData({
                    title: '',
                    description: '',
                    type: 'video',
                    category: '',
                    featured: false,
                    externalLink: '',
                    thumbnail: '',
                    isUpcoming: false,
                    date: new Date().getFullYear().toString(),
                    color: 'bg-neutral-900',
                });
                setThumbnailFile(null);
                alert('Project Published');
            } else {
                alert('Project Updated');
            }

        } catch (error) {
            console.error(error);
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light tracking-wider text-neutral-400 uppercase">
                    {initialData ? 'Edit Project' : 'New Entry'}
                </h2>
                {initialData && (
                    <button onClick={onCancel} className="text-neutral-500 hover:text-white">
                        <X size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Project Kind Toggle */}
                <div className="bg-black border border-neutral-800 p-1 flex rounded mb-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isUpcoming: false })}
                        className={cn("flex-1 text-xs uppercase tracking-widest py-2 rounded transition-colors", !formData.isUpcoming ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white")}
                        suppressHydrationWarning
                    >
                        Standard Project
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isUpcoming: true })}
                        className={cn("flex-1 text-xs uppercase tracking-widest py-2 rounded transition-colors", formData.isUpcoming ? "bg-amber-900/50 text-amber-500" : "text-neutral-500 hover:text-white")}
                        suppressHydrationWarning
                    >
                        Upcoming Project
                    </button>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Title</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white transition-colors outline-none"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
                    <textarea
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white transition-colors outline-none h-24"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {formData.isUpcoming ? (
                    // --- UPCOMING SPECIFIC FIELDS ---
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Year</label>
                            <input
                                type="text"
                                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white outline-none"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                suppressHydrationWarning
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Theme Color</label>
                            <select
                                className="w-full bg-black border border-neutral-800 p-3 text-white outline-none"
                                value={formData.color}
                                onChange={e => setFormData({ ...formData, color: e.target.value })}
                                suppressHydrationWarning
                            >
                                <option value="bg-neutral-900">Neutral (Gray)</option>
                                <option value="bg-red-900">Red</option>
                                <option value="bg-blue-900">Blue</option>
                                <option value="bg-purple-900">Purple</option>
                                <option value="bg-emerald-900">Emerald</option>
                                <option value="bg-amber-900">Amber</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    // --- STANDARD SPECIFIC FIELDS ---
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Type</label>
                            <select
                                className="w-full bg-black border border-neutral-800 p-3 text-white outline-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                suppressHydrationWarning
                            >
                                <option value="video">Video</option>
                                <option value="image">Image</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Category</label>
                            <input
                                type="text"
                                placeholder="e.g. Commercial"
                                className="w-full bg-black border border-neutral-800 p-3 text-white outline-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                suppressHydrationWarning
                            />
                        </div>
                    </div>
                )}

                {/* Upcoming Project Image */}
                {formData.isUpcoming && (
                    <div className="border-t border-b border-neutral-800 py-4 my-4">
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Project Poster / Image</label>

                        {/* URL Input */}
                        <div className="mb-3">
                            <input
                                type="url"
                                placeholder="Image URL (https://...)"
                                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white outline-none"
                                value={formData.externalLink}
                                onChange={e => setFormData({ ...formData, externalLink: e.target.value })}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-neutral-800 p-4 text-center hover:border-neutral-600 transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setThumbnailFile(e.target.files[0]); // Reuse thumbnailFile state as it's just a file holder
                                    }
                                }}
                            />
                            <div className="pointer-events-none flex flex-col items-center">
                                <span className="text-neutral-500 text-xs">
                                    {thumbnailFile ? thumbnailFile.name : "Or Upload Image File"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Media Link (Standard Project) */}
                {!formData.isUpcoming && (
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Media URL</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white outline-none"
                            value={formData.externalLink}
                            onChange={e => setFormData({ ...formData, externalLink: e.target.value })}
                            required
                        />
                    </div>
                )}

                {/* Thumbnail Input - Only for Video Standard */}
                {!formData.isUpcoming && (formData.type === 'video') && (
                    <div className="mt-4 pt-4 border-t border-neutral-800">
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Custom Thumbnail (Optional)</label>

                        {/* URL Input */}
                        <div className="mb-3">
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white outline-none"
                                value={formData.thumbnail}
                                onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-neutral-800 p-4 text-center hover:border-neutral-600 transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleThumbnailChange}
                            />
                            <div className="pointer-events-none flex flex-col items-center">
                                <span className="text-neutral-500 text-xs">
                                    {thumbnailFile ? thumbnailFile.name : "Or Upload Thumbnail Image"}
                                </span>
                            </div>
                        </div>
                        {formData.thumbnail && !thumbnailFile && (
                            <p className="text-xs text-neutral-600 mt-1">Current: {formData.thumbnail.startsWith('http') ? 'URL' : 'Saved'}</p>
                        )}
                    </div>
                )}

                {/* Featured Toggle (Only Standard) */}
                {!formData.isUpcoming && (
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-4 h-4 accent-white"
                            suppressHydrationWarning
                        />
                        <label htmlFor="featured" className="text-sm text-neutral-400">Highlight this project (Featured)</label>
                    </div>
                )}

                <div className="flex gap-2">
                    {initialData && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="w-1/3 border border-neutral-700 text-white py-4 uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                            suppressHydrationWarning
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-white text-black py-4 uppercase tracking-widest hover:bg-neutral-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                        suppressHydrationWarning
                    >
                        {loading && <Loader2 className="animate-spin w-4 h-4" />}
                        {initialData ? 'Save Changes' : (formData.isUpcoming ? 'Add Upcoming Project' : 'Publish Project')}
                    </button>
                </div>

            </form>
        </div>
    );
}
