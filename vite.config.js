import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        faq: resolve(__dirname, 'faq.html'),
        blog: resolve(__dirname, 'blog.html'),
        subscription: resolve(__dirname, 'subscription.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
