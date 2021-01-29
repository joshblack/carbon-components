/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const CSSOM = require('cssom');
const sass = require('sass');
const { Importer } = require('./importer');

const SassRenderer = {
  create(cwd, initialData = '') {
    const importer = Importer.create(cwd);

    async function render(data) {
      const values = [];
      const namedValues = new Map();
      const result = sass.renderSync({
        data: `${initialData}\n${data}`,
        importer,
        functions: {
          'get-value($arg)': (arg) => {
            values.push(arg);
            return sass.types.Null.NULL;
          },
          'get($name, $arg)': (name, arg) => {
            namedValues.set(convert(name), convert(arg));
            return sass.types.Null.NULL;
          },
        },
      });

      let stylesheet = null;

      return {
        result,
        values,
        get(key) {
          if (namedValues.has(key)) {
            return namedValues.get(key);
          }
          throw new Error(`No value available with key: ${key}`);
        },
        getValue(index) {
          return convert(values[index]);
        },
        getStyleSheet() {
          if (stylesheet) {
            return stylesheet;
          }

          const cssom = CSSOM.parse(result.css.toString());
          stylesheet = {
            getRule(selector) {
              const rule = cssom.cssRules.find((rule) => {
                return rule.selectorText === selector;
              });
              if (!rule) {
                throw new Error(
                  `Unable to find CSS Rule with selector ${selector}`
                );
              }
              return rule;
            },
            getValue(rule, property) {
              return rule.style[property];
            },
          };

          return stylesheet;
        },
      };
    }

    return {
      convert,
      render,
      types: sass.types,
    };
  },
};

/**
 * Converts a value from Sass into a comparable JavaScript type
 */
function convert(value) {
  const { types } = sass;

  if (value instanceof types.Boolean) {
    return value.getValue();
  }

  if (value instanceof types.Number) {
    const unit = value.getUnit();
    if (unit === '') {
      return value.getValue();
    }
    return `${value.getValue()}${unit}`;
  }

  if (value instanceof types.String) {
    return value.getValue();
  }

  if (value instanceof types.Color) {
    return value.toString();
  }

  if (value instanceof types.List) {
    const length = value.getLength();
    const result = Array(length);

    for (let i = 0; i < length; i++) {
      result[i] = convert(value.getValue(i));
    }

    return result;
  }

  if (value instanceof types.Map) {
    const length = value.getLength();
    const result = {};

    for (let i = 0; i < length; i++) {
      const key = convert(value.getKey(i));
      result[key] = convert(value.getValue(i));
    }

    return result;
  }

  if (value instanceof types.Null) {
    return null;
  }

  return value;
}

module.exports = {
  SassRenderer,
};
