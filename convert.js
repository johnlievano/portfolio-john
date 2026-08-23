import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folders = ['./public/projects'];

folders.forEach(folder => {
  if (!fs.existsSync(folder)) return;
  fs.readdirSync(folder).forEach(file => {
    const filePath = path.join(folder, file);
    const tempPath = path.join(folder, `temp_${file}`);
    
    // Procesamos y sobrescribimos para forzar la compresión real WebP
    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(tempPath)
      .then(() => {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log(`Optimizado a WebP real: ${file}`);
      })
      .catch(err => console.error(err));
  });
});