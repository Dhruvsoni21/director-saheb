"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collaboration } from '@/lib/store';

interface CollaborationFormProps {
    initialData?: Collaboration | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function CollaborationForm({ initialData, onCancel, onSuccess }: CollaborationFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        client: '',
        description: '',
        type: 'instagram',
        category: '',
        thumbnail: '',
        external_url: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                client: initialData.client,
                description: initialData.description,
                type: initialData.type as string,
                category: initialData.category || '',
                thumbnail: initialData.thumbnail || '',
                external_url: initialData.external_url || '',
            });
            setThumbnailFile(null);
        } else {
            setFormData({
                title: '',
                client: '',
                description: '',
                type: 'instagram',
                category: '',
                thumbnail: '',
                external_url: '',
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

            // Upload thumbnail file to Cloudinary
            if (thumbnailFile) {
                const uploadData = new FormData();
                uploadData.append('file', thumbnailFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                if (!uploadRes.ok) {
                    let errMsg = 'Thumbnail upload failed';
                    try {
                        const errData = await uploadRes.json();
                        if (errData.error) errMsg += ': ' + errData.error;
                    } catch (e) {
                        errMsg += ` (${uploadRes.status} ${uploadRes.statusText})`;
                    }
                    throw new Error(errMsg);
                }
                const uploadJson = await uploadRes.json();
                thumbnailUrl = uploadJson.url;
            }

            const method = initialData ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                thumbnail: thumbnailUrl,
                id: initialData ? initialData.id : undefined,
            };

            const res = await fetch('/api/collaborations', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Action failed');
            }

            router.refresh();
            onSuccess();
            if (!initialData) {
                setFormData({
                    title: '',
                    client: '',
                    description: '',
                    type: 'instagram',
                    category: '',
                    thumbnail: '',
                    external_url: '',
                });
                setThumbnailFile(null);
                alert('Collaboration Published');
            } else {
                alert('Collaboration Updated');
            }

        } catch (error) {
            console.error(error);
            alert('Failed to save collaboration: ' + (error instanceof Error ? error.message : String(error)));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light tracking-wider text-neutral-400 uppercase">
                    {initialData ? 'Edit Collaboration' : 'New Collaboration'}
                </h2>
                {initialData && (
                    <button onClick={onCancel} className="text-neutral-500 hover:text-white">
                        <X size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Project Title</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Luxury Interior Design"
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white transition-colors outline-none"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {/* Client */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Client / Company</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. ABC Interiors"
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white transition-colors outline-none"
                        value={formData.client}
                        onChange={e => setFormData({ ...formData, client: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
                    <textarea
                        placeholder="1-2 line project description"
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white transition-colors outline-none h-20"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {/* Type & Category */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Type</label>
                        <select
                            className="w-full bg-black border border-neutral-800 p-3 text-white outline-none"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            suppressHydrationWarning
                        >
                            <option value="instagram">Instagram Reel</option>
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

                {/* External URL (Instagram / Social Link) */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                        {formData.type === 'instagram' ? 'Instagram Reel URL' : 'External URL'}
                    </label>
                    <input
                        type="url"
                        placeholder={formData.type === 'instagram' ? 'https://instagram.com/reel/...' : 'https://...'}
                        className="w-full bg-black border border-neutral-800 p-3 text-white focus:border-white outline-none"
                        value={formData.external_url}
                        onChange={e => setFormData({ ...formData, external_url: e.target.value })}
                        suppressHydrationWarning
                    />
                </div>

                {/* Thumbnail */}
                <div className="border-t border-neutral-800 pt-4">
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Reel / Project Thumbnail</label>

                    {/* URL Input */}
                    <div className="mb-3">
                        <input
                            type="url"
                            placeholder="Cloudinary / Image URL (https://...)"
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

                    {/* Preview */}
                    {(formData.thumbnail || thumbnailFile) && (
                        <div className="mt-3 relative w-full aspect-video bg-neutral-900 rounded overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : formData.thumbnail}
                                alt="Preview"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                                </div>
                            </div>
                            {formData.type === 'instagram' && (
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur px-2 py-1 rounded-full border border-white/10">
                                    <span className="text-white/70 text-[9px] tracking-wider uppercase">Reel</span>
                                </div>
                            )}
                        </div>
                    )}

                    {formData.thumbnail && !thumbnailFile && (
                        <p className="text-xs text-neutral-600 mt-1">Current: {formData.thumbnail.startsWith('http') ? 'URL' : 'Saved'}</p>
                    )}
                </div>

                {/* Action Buttons */}
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
                        {initialData ? 'Save Changes' : 'Publish Collaboration'}
                    </button>
                </div>

            </form>
        </div>
    );
}
