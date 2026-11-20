import { defineConfig } from 'vite';

// The preview reads the release files directly so edits update localhost live.
export default defineConfig({
  root: '../../release-portfolio-comic/public',
  build: {
    outDir: '../../.portfolio-versions/comic-preview/dist',
    emptyOutDir: true,
  },
});
