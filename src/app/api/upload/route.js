import { NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

export async function POST(request) {
  try {
    // 1. Authorization Check
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const expectedToken = generateAdminToken();
    
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
    }

    // 3. Preliminary Mime-type & Size Checks
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large. Maximum size is ${MAX_SIZE_MB}MB.` }, { status: 400 });
    }

    // 4. Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Optimize & Validate Magic Bytes with Sharp
    let optimizedBuffer;
    try {
      // sharp automatically reads magic bytes. If a .exe is disguised as a .jpg, it will throw an error here.
      optimizedBuffer = await sharp(buffer)
        .resize({ 
          width: 800, 
          height: 800, 
          fit: 'contain', // Ensures the whole image fits inside without cropping
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent padding
        })
        .webp({ quality: 85, lossless: false }) // Convert to modern webp with good quality
        .withMetadata(false) // Strip EXIF data
        .toBuffer();
    } catch (sharpError) {
      console.error('Sharp optimization failed (possible fake image):', sharpError);
      return NextResponse.json({ error: 'Corrupt or invalid image file.' }, { status: 400 });
    }

    // 6. Generate safe UUID filename
    const uuid = crypto.randomUUID();
    const filename = `${uuid}.webp`;
    
    // 7. Ensure directory exists
    const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // 8. Save file to disk
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, optimizedBuffer);

    // Return the public URL
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error during upload.' }, { status: 500 });
  }
}
