import { NextResponse } from 'next/server';
import {
    getCollaborations,
    addCollaboration,
    updateCollaboration,
    deleteCollaboration,
    reorderCollaborations,
    getCollaborationById,
    Collaboration
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

// GET — Fetch all collaborations (public)
export async function GET() {
    try {
        const collaborations = await getCollaborations();
        return NextResponse.json(collaborations);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch collaborations' }, { status: 500 });
    }
}

// POST — Create a new collaboration
export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!body.title || !body.client) {
            return NextResponse.json({ error: 'Missing required fields (title, client)' }, { status: 400 });
        }

        const newCollab: Collaboration = {
            id: uuidv4(),
            title: body.title,
            client: body.client,
            description: body.description || '',
            type: body.type || 'instagram',
            thumbnail: body.thumbnail || '',
            external_url: body.external_url || '',
            category: body.category || 'General',
        };

        await addCollaboration(newCollab);
        return NextResponse.json(newCollab, { status: 201 });
    } catch (error: any) {
        console.error('Create collab error:', error);
        return NextResponse.json({ error: error.message || 'Failed to create collaboration' }, { status: 500 });
    }
}

// PUT — Update an existing collaboration
export async function PUT(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ error: 'Missing collaboration ID' }, { status: 400 });
        }

        await updateCollaboration(body as Collaboration);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to update collaboration' }, { status: 500 });
    }
}

// PATCH — Reorder collaborations
export async function PATCH(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        await reorderCollaborations(body as Collaboration[]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to reorder collaborations' }, { status: 500 });
    }
}

// DELETE — Remove a collaboration + cleanup Cloudinary assets
export async function DELETE(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing collaboration ID' }, { status: 400 });
        }

        const collab = await getCollaborationById(id);

        if (collab) {
            // Cleanup Cloudinary thumbnail if applicable
            if (collab.thumbnail && collab.thumbnail.includes('cloudinary')) {
                const publicId = extractPublicId(collab.thumbnail);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
                    } catch (err) {
                        console.error(`Failed to delete asset ${publicId}:`, err);
                    }
                }
            }
        }

        await deleteCollaboration(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete collaboration' }, { status: 500 });
    }
}
