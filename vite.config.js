import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
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
        target: "http://mid-api.dev",
        changeOrigin: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }
    }
  }
})
