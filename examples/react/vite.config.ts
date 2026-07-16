import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: fileURLToPath(new URL(".", import.meta.url)),
  // The package is installed via `file:../..`; dedupe the shared editor
  // runtime so the example and package resolve one copy of each peer.
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@blocknote/core",
      "@blocknote/react",
      "yjs",
    ],
  },
});
