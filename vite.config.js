import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path'; // Импортируем функцию resolve

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ['/**/*.ts', '/**/*.js', '/**/*.hbs'],
    }),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'), // Используем resolve для указания пути
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/client/index.html'),
      },
    },
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/client/styles/variables.scss";`
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  },
});
