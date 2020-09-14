'use strict';

const path = require('path');
const sass = require('sass');

module.exports = {
  sassOptions: {
    includePaths: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
  },

  webpack(config) {
    const visited = new Set();

    function walk(value, key, visit) {
      if (value && typeof value === 'object') {
        if (visited.has(value)) {
          return;
        }

        for (const key of Object.keys(value)) {
          walk(value[key], key, visit);
          visited.add(value);
        }
      }

      visit(value, key);
    }

    walk(config, null, (value, key) => {
      if (value && value.loader && value.loader.includes('sass-loader')) {
        value.options.implementation = require('sass');
      }
    });

    return config;
  },
};
