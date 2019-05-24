const banner = `/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */`;
const bundle = await rollup({
  // input: ['__entrypoint__.js'],
  input: {
    index: '__entrypoint__.js',
  },
  external: ['@carbon/icon-helpers', 'react', 'prop-types'],
  plugins: [
    // Make sure files have `.js` and imports include that ending so plugins
    // don't opt-out because thef ile does not have a `.js` extension
    virtual({
      '__entrypoint__.js': `
export { default as Icon } from './Icon.js';
export * from './iconPropTypes.js';
`,
      './Icon.js': fs.readFileSync(
        path.resolve(__dirname, '../src/Icon.js'),
        'utf8'
      ),
      './iconPropTypes.js': fs.readFileSync(
        path.resolve(__dirname, '../src/iconPropTypes.js'),
        'utf8'
      ),
    }),
    babel({
      babelrc: false,
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['extends browserslist-config-carbon'],
            },
          },
        ],
        '@babel/preset-react',
      ],
    }),
    // Turn __DEV__ and process.env checks into constants.
    replace({
      __DEV__: process.env.NODE_ENV === 'production' ? 'false' : 'true',
      'process.env.NODE_ENV':
        process.env.NODE_ENV === 'production'
          ? "'production'"
          : "'development'",
    }),
    stripBanner(),
  ],
});

const { output } = await bundle.generate({
  format: 'esm',
  banner,
});
console.log(output);
