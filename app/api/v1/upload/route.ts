import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import os from 'os';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// POST /api/v1/upload - authenticated image upload
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Only images are allowed' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize and create a unique filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${sanitizedName}`;

    // Storage behavior:
    // - If Cloudinary env vars are present, upload to Cloudinary.
    // - In development: write to `public/uploads` so images are served locally.
    // - In production without external storage: return a 503 with guidance.

    const hasCloudinaryConfig =
      !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY && !!process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinaryConfig) {
      // Configure Cloudinary from env
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Helper to stream buffer to Cloudinary
      const uploadToCloudinary = (buffer: Buffer) =>
        new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'koventra_uploads', resource_type: 'auto' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          const s = new Readable();
          s.push(buffer);
          s.push(null);
          s.pipe(uploadStream);
        });

      try {
        const result = await uploadToCloudinary(buffer);
        const url = result?.secure_url || result?.url || null;
        return NextResponse.json({
          success: true,
          url,
          public_id: result?.public_id,
          width: result?.width,
          height: result?.height,
          bytes: result?.bytes,
          format: result?.format,
          resource_type: result?.resource_type,
          secure_url: result?.secure_url,
        });
      } catch (err) {
        console.error('Cloudinary upload failed:', err);
        return NextResponse.json({ success: false, error: 'Cloudinary upload failed' }, { status: 500 });
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // Define storage path
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      // Ensure uploads directory exists
      await mkdir(uploadsDir, { recursive: true });

      // Write file to disk (dev only)
      const filePath = join(uploadsDir, uniqueFilename);
      await writeFile(filePath, buffer);

      const fileUrl = `/uploads/${uniqueFilename}`;
      return NextResponse.json({ success: true, url: fileUrl });
    }

    // Production behavior: detect common hosting environments and fail fast with guidance.
    if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
      console.error('File upload attempted in production environment without external storage configured.');
      return NextResponse.json(
        {
          success: false,
          error:
            'Uploads are disabled in production. Configure external storage (S3, Cloudinary, or Vercel Blob) and update /api/v1/upload to use it.',
        },
        { status: 503 }
      );
    }

    // Fallback (non-production but not dev) - write to OS temp and return path for debugging.
    const tmpDir = os.tmpdir();
    const tmpPath = join(tmpDir, uniqueFilename);
    await writeFile(tmpPath, buffer);
    console.warn('File written to temp path (not publicly served):', tmpPath);
    return NextResponse.json({
      success: true,
      url: null,
      note: `File saved to temporary path: ${tmpPath}. Configure external storage for persistent/public access.`,
    });
  } catch (error) {
    console.error('API Error: File upload failed:', error);
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}
