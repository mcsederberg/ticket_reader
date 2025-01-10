import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  root: process.cwd(),
  plugins: [vue()],
  resolve: {
    alias: [
      {find: "@", replacement: '/src'}
    ],
  },
  base: '/ticket_reader/',
})
