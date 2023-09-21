import { defineConfig } from "vite";
import logseqDevPlugin from "vite-plugin-logseq";

export default defineConfig({
  plugins: [logseqDevPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id!
              .toString()
              .split("node_modules/")[1]!
              .split("/")[0]!
              .toString();
          }
        },
      },
    },
  },
});
