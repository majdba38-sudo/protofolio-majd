import fs from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Dev-only upload endpoint used by the in-site upload buttons.
 * POST /__cms/upload with headers x-slot (e.g. "experiments/mishkat/mockup/bookmarks")
 * and x-filename, body = raw file bytes.
 * Saves the file to public/uploads/... and records it in public/media-manifest.json.
 * In a production build this endpoint does not exist, so uploads stay as previews.
 */
const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const SEGMENT = /^[a-z0-9_-]+$/;

export function ideaLabUploads(): Plugin {
  return {
    name: 'idea-lab-uploads',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root;

      server.middlewares.use('/__cms/upload', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') {
          send(405, { error: 'Method not allowed' });
          return;
        }

        try {
          const slot = decodeURIComponent(String(req.headers['x-slot'] ?? ''));
          const originalName = decodeURIComponent(String(req.headers['x-filename'] ?? 'file'));
          const segments = slot.split('/');
          if (segments.some((s) => !SEGMENT.test(s))) throw new Error('Invalid media slot');

          const ext = path.extname(originalName).toLowerCase();
          if (!ALLOWED_EXTENSIONS.has(ext)) throw new Error('Unsupported file type');

          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += (chunk as Buffer).length;
            if (size > MAX_BYTES) throw new Error('File is larger than 20 MB');
            chunks.push(chunk as Buffer);
          }

          const folderSegments = segments.slice(0, -1);
          const baseName = segments[segments.length - 1];
          const fileName = `${baseName}-${Date.now()}${ext}`;
          const dir = path.join(root, 'public', 'uploads', ...folderSegments);
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(path.join(dir, fileName), Buffer.concat(chunks));

          const url = `/uploads/${[...folderSegments, fileName].join('/')}`;
          const manifestPath = path.join(root, 'public', 'media-manifest.json');
          const manifest: Record<string, string> = JSON.parse(
            await fs.readFile(manifestPath, 'utf8').catch(() => '{}'),
          );
          manifest[slot] = url;
          await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

          send(200, { url });
        } catch (error) {
          send(400, { error: error instanceof Error ? error.message : 'Upload failed' });
        }
      });
    },
  };
}
