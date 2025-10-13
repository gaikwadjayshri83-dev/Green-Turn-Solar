import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ This configuration ensures that all asset paths are relative.
// ✅ That way, images and JS files load correctly both locally and on Hostinger.
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 This is the key line — fixes missing images and broken JS on deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
