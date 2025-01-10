import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './', // Используйте относительные пути
  build: {
    outDir: '../dist',
  },
  server: {
    host: true, // Зафиксируйте адрес
    port: 5173,        // Укажите нужный порт
    proxy: {
      "/api": {
        target: "http://192.168.0.106:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"), // Убираем /api из пути
      },
    },
  },

  plugins: [
    react(),
    mkcert(),
    VitePWA({
      manifest: {
        name: 'Сервис для трудоустройства',
        short_name: 'HH',
        description: 'Прогрессивное веб-приложение для трудоустройства людей с ограниченными возможностями.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'logo201.png',
            sizes: '201x201',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1627x800',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '630x1136',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate', // Автоматическое обновление service worker
      includeAssets: ['favicon.ico', 'robots.txt'],
    })
  ],
});
