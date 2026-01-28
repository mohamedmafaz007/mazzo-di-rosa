import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Custom plugin to handle local content API
const localApiPlugin = () => ({
  name: 'local-api-handler',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Handle GET /api/content
      if (req.url === '/api/content' && req.method === 'GET') {
        const filePath = path.resolve(__dirname, 'src/context/content.json');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(content);
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Content file not found' }));
        }
        return;
      }

      // Handle POST /api/content
      if (req.url === '/api/content' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const filePath = path.resolve(__dirname, 'src/context/content.json');
            fs.writeFileSync(filePath, body, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save content' }));
          }
        });
        return;
      }

      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    localApiPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
