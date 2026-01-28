// vite.config.ts
import { defineConfig } from "file:///C:/Users/USER/Videos/Mazzo%20di%20Rosa/frontend/mazzo-di-rosa-showcase-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/USER/Videos/Mazzo%20di%20Rosa/frontend/mazzo-di-rosa-showcase-main/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/USER/Videos/Mazzo%20di%20Rosa/frontend/mazzo-di-rosa-showcase-main/node_modules/lovable-tagger/dist/index.js";
import fs from "fs";
var __vite_injected_original_dirname = "C:\\Users\\USER\\Videos\\Mazzo di Rosa\\frontend\\mazzo-di-rosa-showcase-main";
var localApiPlugin = () => ({
  name: "local-api-handler",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/api/content" && req.method === "GET") {
        const filePath = path.resolve(__vite_injected_original_dirname, "src/context/content.json");
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          res.setHeader("Content-Type", "application/json");
          res.end(content);
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Content file not found" }));
        }
        return;
      }
      if (req.url === "/api/content" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            const filePath = path.resolve(__vite_injected_original_dirname, "src/context/content.json");
            fs.writeFileSync(filePath, body, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to save content" }));
          }
        });
        return;
      }
      next();
    });
  }
});
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    localApiPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXFZpZGVvc1xcXFxNYXp6byBkaSBSb3NhXFxcXGZyb250ZW5kXFxcXG1henpvLWRpLXJvc2Etc2hvd2Nhc2UtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxWaWRlb3NcXFxcTWF6em8gZGkgUm9zYVxcXFxmcm9udGVuZFxcXFxtYXp6by1kaS1yb3NhLXNob3djYXNlLW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VTRVIvVmlkZW9zL01henpvJTIwZGklMjBSb3NhL2Zyb250ZW5kL21henpvLWRpLXJvc2Etc2hvd2Nhc2UtbWFpbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG4vLyBDdXN0b20gcGx1Z2luIHRvIGhhbmRsZSBsb2NhbCBjb250ZW50IEFQSVxuY29uc3QgbG9jYWxBcGlQbHVnaW4gPSAoKSA9PiAoe1xuICBuYW1lOiAnbG9jYWwtYXBpLWhhbmRsZXInLFxuICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIC8vIEhhbmRsZSBHRVQgL2FwaS9jb250ZW50XG4gICAgICBpZiAocmVxLnVybCA9PT0gJy9hcGkvY29udGVudCcgJiYgcmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbnRleHQvY29udGVudC5qc29uJyk7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGYtOCcpO1xuICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgcmVzLmVuZChjb250ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwNDtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdDb250ZW50IGZpbGUgbm90IGZvdW5kJyB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgUE9TVCAvYXBpL2NvbnRlbnRcbiAgICAgIGlmIChyZXEudXJsID09PSAnL2FwaS9jb250ZW50JyAmJiByZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgbGV0IGJvZHkgPSAnJztcbiAgICAgICAgcmVxLm9uKCdkYXRhJywgY2h1bmsgPT4geyBib2R5ICs9IGNodW5rOyB9KTtcbiAgICAgICAgcmVxLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZXh0L2NvbnRlbnQuanNvbicpO1xuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCwgYm9keSwgJ3V0Zi04Jyk7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUgfSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdGYWlsZWQgdG8gc2F2ZSBjb250ZW50JyB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBsb2NhbEFwaVBsdWdpbigpXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlaLFNBQVMsb0JBQW9CO0FBQ3RiLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxRQUFRO0FBSmYsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxpQkFBaUIsT0FBTztBQUFBLEVBQzVCLE1BQU07QUFBQSxFQUNOLGdCQUFnQixRQUFRO0FBQ3RCLFdBQU8sWUFBWSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7QUFFekMsVUFBSSxJQUFJLFFBQVEsa0JBQWtCLElBQUksV0FBVyxPQUFPO0FBQ3RELGNBQU0sV0FBVyxLQUFLLFFBQVEsa0NBQVcsMEJBQTBCO0FBQ25FLFlBQUksR0FBRyxXQUFXLFFBQVEsR0FBRztBQUMzQixnQkFBTSxVQUFVLEdBQUcsYUFBYSxVQUFVLE9BQU87QUFDakQsY0FBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsY0FBSSxJQUFJLE9BQU87QUFBQSxRQUNqQixPQUFPO0FBQ0wsY0FBSSxhQUFhO0FBQ2pCLGNBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLHlCQUF5QixDQUFDLENBQUM7QUFBQSxRQUM3RDtBQUNBO0FBQUEsTUFDRjtBQUdBLFVBQUksSUFBSSxRQUFRLGtCQUFrQixJQUFJLFdBQVcsUUFBUTtBQUN2RCxZQUFJLE9BQU87QUFDWCxZQUFJLEdBQUcsUUFBUSxXQUFTO0FBQUUsa0JBQVE7QUFBQSxRQUFPLENBQUM7QUFDMUMsWUFBSSxHQUFHLE9BQU8sTUFBTTtBQUNsQixjQUFJO0FBQ0Ysa0JBQU0sV0FBVyxLQUFLLFFBQVEsa0NBQVcsMEJBQTBCO0FBQ25FLGVBQUcsY0FBYyxVQUFVLE1BQU0sT0FBTztBQUN4QyxnQkFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFDaEQsZ0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsVUFDM0MsU0FBUyxLQUFLO0FBQ1osZ0JBQUksYUFBYTtBQUNqQixnQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8seUJBQXlCLENBQUMsQ0FBQztBQUFBLFVBQzdEO0FBQUEsUUFDRixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBRUEsV0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLGVBQWU7QUFBQSxFQUNqQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
