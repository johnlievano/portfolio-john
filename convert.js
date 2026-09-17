import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folders = ['./public/esferas'];

folders.forEach(folder => {
  if (!fs.existsSync(folder)) return;
  fs.readdirSync(folder).forEach(file => {
    if (!file.toLowerCase().endsWith('.png')) return; // solo procesa PNG

    const filePath = path.join(folder, file);
    const outputName = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(folder, outputName);

    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        fs.unlinkSync(filePath);
        console.log(`Convertido a WebP: ${outputName}`);
      })
      .catch(err => console.error(err));
  });
});