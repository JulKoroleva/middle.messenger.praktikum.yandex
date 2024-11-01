import Handlebars from 'handlebars';

export async function load(url, context, defaultLoad) {
  const { pathname } = new URL(url);

  if (pathname.endsWith('.hbs')) {
    const source = await defaultLoad(url, context);
    const compiled = `
      import Handlebars from 'handlebars/runtime.js';
      export default Handlebars.template(${Handlebars.precompile(source.source)});
    `;
    return { format: 'module', source: compiled };
  }

  return defaultLoad(url, context);
}
