import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Base must be the repository name when deploying to GitHub Pages under a project site
export default defineConfig({
  base: '/text-tools/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
