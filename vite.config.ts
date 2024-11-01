import { defineConfig, PluginOption } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import svgr from "vite-plugin-svgr";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handlebars-precompile.ts";

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ["/**/*.ts", "/**/*.js", "/**/*.hbs"],
    }) as PluginOption,
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }) as PluginOption,
    vitePluginHandlebarsPrecompile() as PluginOption,
    svgr() as PluginOption,
  ],
  build: {
    outDir: "./dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        dir: "./dist",
        format: "es",
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
