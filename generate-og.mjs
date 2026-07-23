import sharp from 'sharp';
import path from 'path';

async function generateOgImage() {
  const inputPath = path.join(process.cwd(), 'public', 'logo.png');
  const outputPath = path.join(process.cwd(), 'public', 'og-image.png');

  try {
    await sharp(inputPath)
      .resize({
        width: 1200,
        height: 630,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .toFile(outputPath);
    console.log('OG Image generated successfully!');
  } catch (error) {
    console.error('Error generating OG Image:', error);
  }
}

generateOgImage();
