import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';
import { addProject, Project } from '@/lib/store';

export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const filePath = path.join(process.cwd(), 'data', 'projects.json');

        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json({ error: 'No local data file found' });
        }

        const data = await fs.readFile(filePath, 'utf-8');
        const projects: Project[] = JSON.parse(data);

        let count = 0;
        for (const project of projects) {
            // Check if we need to adjust any fields for the new schema
            // The schema expects 'src', 'title' etc which match.
            // ID will be handled by Mongo, or we can keep the old one if we want consistency.
            // store.ts addProject removes the ID anyway to let Mongo generate it, 
            // but for migration we might want to keep it? 
            // The current addProject implementation: const { id, ...projectData } = project; -> Mongo generates new ID.
            // This is fine.

            await addProject(project);
            count++;
        }

        return NextResponse.json({ success: true, migrated: count });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({ error: 'Migration failed', details: String(error) }, { status: 500 });
    }
}
