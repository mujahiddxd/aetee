import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { filename } = await params;

  // Sanitize: only allow alphanumeric, hyphens, and .webp extension
  if (!/^[a-zA-Z0-9-]+\.webp$/.test(filename)) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (err) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Error reading image file:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
