import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    eslintPlugin({
        include: ['/**/*.ts', '/**/*.js', '/**/*.hbs'],
      }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3000,
    open: true,
  },
})
