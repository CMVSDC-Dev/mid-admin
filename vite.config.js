import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".vue",
        ".css",
        ".svg",
      ],
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js',
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api' : {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      }
    }
  });
}
