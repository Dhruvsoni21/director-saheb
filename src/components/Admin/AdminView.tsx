"use client";

import { useState } from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { Project } from '@/lib/store';


export default function AdminView() {
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Provide a way for the List to refresh itself or the parent to trigger refresh
    // For now we rely on router.refresh() in the children or internal fetching

    return (
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
    );
}
