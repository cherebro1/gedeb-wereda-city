import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function addDirectoryToZip(zip, dirPath, rootDir) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(rootDir, fullPath);

    // Skip ignored directories and files
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === 'bun.lock' ||
      entry.name === 'gedeb_source_code.zip' ||
      relativePath.startsWith('public/gedeb_source_code.zip')
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      const folderZip = zip.folder(entry.name);
      await addDirectoryToZip(folderZip, fullPath, rootDir);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zip.file(entry.name, fileData);
    }
  }
}

async function createProjectZip() {
  const rootDir = process.cwd();
  const zip = new JSZip();

  console.log('Building complete source code zip from:', rootDir);
  await addDirectoryToZip(zip, rootDir, rootDir);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const outPublic = path.join(rootDir, 'public', 'gedeb_source_code.zip');
  fs.writeFileSync(outPublic, content);
  console.log('Successfully created:', outPublic, `(${Math.round(content.length / 1024)} KB)`);
}

createProjectZip().catch((err) => {
  console.error('Failed to create project zip:', err);
  process.exit(1);
});
