import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'base' property. It tells Vite the correct path for your assets on GitHub Pages.
  base: '/E-commerce-internship-project/',
})
