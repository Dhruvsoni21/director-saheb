"use client";

import { useState } from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import CollaborationForm from './CollaborationForm';
import CollaborationList from './CollaborationList';
import { Project, Collaboration } from '@/lib/store';
import { cn } from '@/lib/utils';

type AdminTab = 'projects' | 'collaborations';

export default function AdminView() {
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingCollab, setEditingCollab] = useState<Collaboration | null>(null);
    const [activeTab, setActiveTab] = useState<AdminTab>('projects');

    return (
        <div>
            {/* Top-Level Tab Switcher */}
            <div className="mb-8 flex items-center gap-2 bg-neutral-900/50 p-1.5 rounded-lg border border-neutral-800 w-fit">
                <button
                    onClick={() => { setActiveTab('projects'); setEditingCollab(null); }}
                    className={cn(
                        "px-5 py-2.5 text-xs uppercase tracking-[0.15em] rounded-md transition-all duration-300 font-medium",
                        activeTab === 'projects'
                            ? "bg-white text-black shadow-lg"
                            : "text-neutral-500 hover:text-white hover:bg-white/5"
                    )}
                    suppressHydrationWarning
                >
                    🎬 Projects
                </button>
                <button
                    onClick={() => { setActiveTab('collaborations'); setEditingProject(null); }}
                    className={cn(
                        "px-5 py-2.5 text-xs uppercase tracking-[0.15em] rounded-md transition-all duration-300 font-medium",
                        activeTab === 'collaborations'
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                            : "text-neutral-500 hover:text-white hover:bg-white/5"
                    )}
                    suppressHydrationWarning
                >
                    🤝 Collaborations
                </button>
            </div>

            {/* Conditional Content */}
            {activeTab === 'projects' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <ProjectForm
                            initialData={editingProject}
                            onCancel={() => setEditingProject(null)}
                            onSuccess={() => setEditingProject(null)}
                        />
                    </div>
                    <div>
                        <ProjectList
                            onEdit={(project) => setEditingProject(project)}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <CollaborationForm
                            initialData={editingCollab}
                            onCancel={() => setEditingCollab(null)}
                            onSuccess={() => setEditingCollab(null)}
                        />
                    </div>
                    <div>
                        <CollaborationList
                            onEdit={(collab) => setEditingCollab(collab)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
