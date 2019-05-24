/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('core-js/features/array/flat-map');

const { toString } = require('@carbon/icon-helpers');
const meta = require('@carbon/icons/meta.json');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const stripBanner = require('rollup-plugin-strip-banner');
const virtual = require('./plugins/virtual');
const { normalize } = require('./normalize');

const { default: generate } = require('@babel/generator');
const { default: template } = require('@babel/template');
const t = require('@babel/types');
const { default: traverse } = require('@babel/traverse');

const PACKAGE_DIR = path.resolve(__dirname, '../');
const BUNDLE_FORMATS = [
  {
    file: path.join(PACKAGE_DIR, 'es/index.js'),
    format: 'esm',
  },
  {
    file: path.join(PACKAGE_DIR, 'lib/index.js'),
    format: 'cjs',
  },
  {
    file: path.join(PACKAGE_DIR, 'umd/index.js'),
    format: 'umd',
  },
];

async function build() {
  const icons = normalize(meta);
  const start = 0;
  const end = 1;
  const output = icons.slice(start, end).map(([icon, sizes]) => {
    const { moduleName } = icon;
    const jsx = icon.descriptor.content.map(mapToJSXElement);
    const ast = template.ast(
      `
const ${moduleName} = React.forwardRef(function ${moduleName}(
  { children, ...rest },
  ref
) {
  return (
    <Icon {...rest} ref={ref}>
      {children}
    </Icon>
  );
});
    `,
      { plugins: ['jsx'] }
    );

    traverse(ast, {
      JSXIdentifier(path) {
        console.log(path);
      },
    });
    // const ast = buildIconComponent({
    // name: t.identifier(icon.moduleName),
    // jsx,
    // // iconPaths: t.identifier('hi'),
    // });
    // console.log(generate(ast).code);
  });
}

function mapToJSXElement(node) {
  const { elem, attrs } = node;

  return t.jsxElement(
    t.jsxOpeningElement(
      t.jsxIdentifier(elem),
      Object.keys(attrs).map(key =>
        t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(attrs[key]))
      ),
      true
    ),
    null,
    []
  );
}

const buildIconComponent = template(
  `
const %%name%% = React.forwardRef(function %%name%%(
  { children, ...rest },
  ref
) {
  return (
    <Icon {...rest} ref={ref}>
      %%jsx%%
      {children}
    </Icon>
  );
});
`,
  {
    plugins: ['jsx'],
  }
);

build().catch(error => {
  console.error(error);
});
