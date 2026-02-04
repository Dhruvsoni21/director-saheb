import { NextResponse } from 'next/server';
import { getProjects, addProject, deleteProject, updateProject, reorderProjects, getProjectById, Project } from '@/lib/store';
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
        // Handle common Cloudinary URL formats
        // Example: https://res.cloudinary.com/cloudname/image/upload/v1234567890/folder/imageid.extension
        const regex = /\/v\d+\/(.+)\.\w+$/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null; // Could not extract
    } catch {
        return null;
    }
}

export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.src) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProject: Project = {
            id: uuidv4(),
            title: body.title,
            description: body.description || '',
            type: body.type || 'image',
            src: body.src,
            thumbnail: body.thumbnail,
            featured: body.featured || false,
            category: body.category || 'General',
            date: body.date || new Date().toISOString(),
            isUpcoming: body.isUpcoming || false,
            color: body.color || 'bg-neutral-900',
        };

        await addProject(newProject);
        return NextResponse.json(newProject, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
        }

        await updateProject(body as Project);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        await reorderProjects(body as Project[]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
        }

        // 1. Fetch project to get Cloudinary URLs
        const project = await getProjectById(id);

        if (project) {
            // 2. Extract Public IDs
            const resourcesToDelete: string[] = [];

            if (project.src && project.src.includes('cloudinary')) {
                const publicId = extractPublicId(project.src);
                if (publicId) resourcesToDelete.push(publicId);
            }

            if (project.thumbnail && project.thumbnail.includes('cloudinary')) {
                const publicId = extractPublicId(project.thumbnail);
                if (publicId) resourcesToDelete.push(publicId);
            }

            // 3. Delete from Cloudinary
            if (resourcesToDelete.length > 0) {
                // We handle image and video separately or let Cloudinary detect
                // Cloudinary destroy API usually needs resource_type if not image
                // But simplified generic attempt:

                await Promise.all(resourcesToDelete.map(async (pid) => {
                    try {
                        // Attempt to delete as image first (default)
                        // If we knew the type (video vs image) from project.type we could optimize
                        const resourceType = project.type === 'video' && project.src.includes(pid) ? 'video' : 'image';
                        await cloudinary.uploader.destroy(pid, { resource_type: resourceType });
                    } catch (err) {
                        console.error(`Failed to delete asset ${pid}:`, err);
                    }
                }));
            }
        }

        // 4. Delete from Database
        await deleteProject(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
