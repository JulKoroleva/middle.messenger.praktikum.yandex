import handlebars from 'rollup-plugin-handlebars';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    handlebars(),
  ],
};
