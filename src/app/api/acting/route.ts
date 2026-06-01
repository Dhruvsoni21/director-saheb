import { NextResponse } from 'next/server';
import {
    getActingProjects,
    addActingProject,
    updateActingProject,
    deleteActingProject,
    reorderActingProjects,
    getActingProjectById,
    ActingProject
} from '@/lib/store';
import { isAuthenticated } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url: string): string | null {
    try {
        const regex = /\/v\d+\/(.+)\.\w+$/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    } catch {
        return null;
    }
}

// GET — Fetch all acting projects (public)
export async function GET() {
    try {
        const projects = await getActingProjects();
        return NextResponse.json(projects);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch acting projects' }, { status: 500 });
    }
}

// POST — Create a new acting project
export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!body.title) {
            return NextResponse.json({ error: 'Missing required field (title)' }, { status: 400 });
        }

        const newProject: ActingProject = {
            id: uuidv4(),
            title: body.title,
            thumbnail: body.thumbnail || '',
            video_url: body.video_url || '',
            type: body.type || 'youtube',
            category: body.category || '',
        };

        await addActingProject(newProject);
        return NextResponse.json(newProject, { status: 201 });
    } catch (error: any) {
        console.error('Create acting project error:', error);
        return NextResponse.json({ error: error.message || 'Failed to create acting project' }, { status: 500 });
    }
}

// PUT — Update an existing acting project
export async function PUT(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ error: 'Missing acting project ID' }, { status: 400 });
        }

        await updateActingProject(body as ActingProject);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to update acting project' }, { status: 500 });
    }
}

// PATCH — Reorder acting projects
export async function PATCH(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        await reorderActingProjects(body as ActingProject[]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to reorder acting projects' }, { status: 500 });
    }
}

// DELETE — Remove an acting project + cleanup Cloudinary assets
export async function DELETE(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing acting project ID' }, { status: 400 });
        }

        const project = await getActingProjectById(id);

        if (project) {
            // Cleanup Cloudinary thumbnail if applicable
            if (project.thumbnail && project.thumbnail.includes('cloudinary')) {
                const publicId = extractPublicId(project.thumbnail);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
                    } catch (err) {
                        console.error(`Failed to delete asset ${publicId}:`, err);
                    }
                }
            }
        }

        await deleteActingProject(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete acting project' }, { status: 500 });
    }
}
