const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/concrete');
const OUTPUT_DIR = path.join(__dirname, '../public/images/concrete/optimized');

// Configuration
const CONFIG = {
  // Hero images - full width backgrounds
  hero: {
    maxWidth: 1920,
    quality: 80,
  },
  // Gallery images - displayed at max ~600px wide
  gallery: {
    maxWidth: 1200,
    quality: 75,
  },
  // Thumbnail sizes for blur placeholders
  blur: {
    width: 10,
    quality: 50,
  }
};

async function optimizeImage(inputPath, outputPath, options) {
  const { maxWidth, quality } = options;

  try {
    const metadata = await sharp(inputPath).metadata();
    const needsResize = metadata.width > maxWidth;

    let pipeline = sharp(inputPath);

    if (needsResize) {
      pipeline = pipeline.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Output both WebP and original format
    const baseName = path.basename(outputPath, path.extname(outputPath));
    const dir = path.dirname(outputPath);

    // Save optimized JPEG
    await pipeline
      .jpeg({ quality, progressive: true })
      .toFile(path.join(dir, `${baseName}.jpg`));

    // Save WebP version
    await pipeline
      .webp({ quality })
      .toFile(path.join(dir, `${baseName}.webp`));

    // Save AVIF version (best compression)
    await pipeline
      .avif({ quality: quality - 5 })
      .toFile(path.join(dir, `${baseName}.avif`));

    console.log(`✓ Optimized: ${path.basename(inputPath)}`);

    return true;
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function generateBlurPlaceholder(inputPath) {
  try {
    const buffer = await sharp(inputPath)
      .resize(CONFIG.blur.width, null, { fit: 'inside' })
      .jpeg({ quality: CONFIG.blur.quality })
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error(`Error generating blur for ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all JPG files
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('optimized'));

  console.log(`\nOptimizing ${files.length} images...\n`);

  const blurDataUrls = {};

  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);

    // Determine if this is a hero image (first image in the list)
    const isHero = file === '1000035716.jpg';
    const config = isHero ? CONFIG.hero : CONFIG.gallery;

    await optimizeImage(inputPath, outputPath, config);

    // Generate blur placeholder
    const blurUrl = await generateBlurPlaceholder(inputPath);
    if (blurUrl) {
      const baseName = path.basename(file, path.extname(file));
      blurDataUrls[baseName] = blurUrl;
    }
  }

  // Save blur data URLs to a JSON file for use in components
  const blurDataPath = path.join(__dirname, '../src/data/blur-placeholders.json');
  const dataDir = path.dirname(blurDataPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(blurDataPath, JSON.stringify(blurDataUrls, null, 2));

  console.log(`\n✓ Blur placeholders saved to: src/data/blur-placeholders.json`);
  console.log(`✓ Optimized images saved to: public/images/concrete/optimized/`);

  // Print size comparison
  console.log('\n--- Size Comparison ---');
  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputWebP = path.join(OUTPUT_DIR, `${baseName}.webp`);

    if (fs.existsSync(outputWebP)) {
      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputWebP).size;
      const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

      console.log(`${file}: ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
    }
  }
}

main().catch(console.error);
