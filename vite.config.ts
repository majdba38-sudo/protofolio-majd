import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ideaLabUploads } from './cms/uploadPlugin.ts';

export default defineConfig({
  plugins: [react(), tailwindcss(), ideaLabUploads()],
  server: {
    watch: {
      ignored: ['**/public/uploads/**', '**/public/media-manifest.json'],
    },
  },
});
