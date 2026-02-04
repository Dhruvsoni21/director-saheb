import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary via stream
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio_uploads', // Optional folder in Cloudinary
                    resource_type: 'auto', // Detect image vs video
                },
                (error, result) => {
                    if (error) reject(error);
                    else if (result) resolve(result); // Check for undefined
                    else reject(new Error('Upload failed with no result'));
                }
            ).end(buffer);
        });

        return NextResponse.json({
            url: result.secure_url,
            filename: result.public_id
        }, { status: 201 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file to Cloudinary' }, { status: 500 });
    }
}
