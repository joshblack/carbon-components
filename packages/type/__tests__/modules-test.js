/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render, types } = SassRenderer.create(__dirname);

describe('@carbon/type', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../index.scss' as type;

      // Variables
      $_: get('variables', meta.module-variables('type'));

      // Functions
      $_: get('functions', meta.module-functions('type'));

      // Mixins
      $_: get('mixins', (
        type-scale: meta.mixin-exists('type-scale', 'type'),
        font-size: meta.mixin-exists('font-size', 'type'),
        font-family: meta.mixin-exists('font-family', 'type'),
        font-weight: meta.mixin-exists('font-weight', 'type'),
      ));
    `);

    const variables = get('variables');
    const functions = get('functions');
    const mixins = get('mixins');

    expect(Object.keys(variables)).toMatchSnapshot();
    expect(Object.keys(functions)).toMatchSnapshot();
    expect(Object.keys(mixins)).toMatchSnapshot();

    // We want all mixins to exist that are defined in the Sass snippet above.
    // Unfortunately, there is no `meta.module-mixins` yet so we go through all
    // the items defined and make sure that the mixin exists
    for (const [key, value] of Object.entries(mixins)) {
      expect(`${key}:${value}`).toBe(`${key}:true`);
    }
  });

  describe('scss/modules/_font-family.scss', () => {
    test('$font-families', async () => {
      const { get } = await render(`
        @use '../scss/modules/font-family';

        $_: get('font-family', font-family.$font-families);
      `);
      expect(get('font-family')).toMatchSnapshot();
    });

    test('font-family', async () => {
      const { get } = await render(`
        @use 'sass:meta';
        @use '../scss/modules/font-family';

        $_: get('font-family-function', meta.function-exists('font-family', 'font-family'));
        $_: get('font-family-mixin', meta.mixin-exists('font-family', 'font-family'));
      `);

      expect(get('font-family-function')).toBe(true);
      expect(get('font-family-mixin')).toBe(true);
    });

    test('$font-weights', async () => {
      const { get } = await render(`
        @use '../scss/modules/font-family';

        $_: get('font-weights', font-family.$font-weights);
      `);
      expect(get('font-weights')).toMatchSnapshot();
    });

    test('font-weight', async () => {
      const { get } = await render(`
        @use 'sass:meta';
        @use '../scss/modules/font-family';

        $_: get('font-weight-function', meta.function-exists('font-weight', 'font-family'));
        $_: get('font-weight-mixin', meta.mixin-exists('font-weight', 'font-family'));
      `);

      expect(get('font-weight-function')).toBe(true);
      expect(get('font-weight-mixin')).toBe(true);
    });
  });

  describe('scss/modules/_scale.scss', () => {
    test('$type-scale', async () => {
      const { getValue } = await render(`
        @use '../scss/modules/scale';
        $_: get-value(scale.$type-scale);
      `);
      expect(getValue(0)).toMatchSnapshot();
    });

    test('@function type-scale', async () => {
      const { getValue } = await render(`
        @use '../scss/modules/scale';

        $_: get-value(scale.type-scale(1));
        $_: get-value(scale.type-scale(2));
        $_: get-value(scale.type-scale(3));
        $_: get-value(scale.type-scale(4));
        $_: get-value(scale.type-scale(5));
      `);

      expect(getValue(0)).toBe('0.75rem');
      expect(getValue(1)).toBe('0.875rem');
    });

    test('@mixin type-scale', async () => {
      const { getStyleSheet, getValue } = await render(`
        @use 'sass:meta';
        @use '../scss/modules/scale';

        $_: get-value(scale.type-scale(1));
        .test {
          @include scale.type-scale(1);
        }
      `);

      const stylesheet = getStyleSheet();
      const rule = stylesheet.getRule('.test');
      const fontSize = stylesheet.getValue(rule, 'font-size');
      expect(fontSize).toBe(getValue(0));
    });

    test('@mixin font-size', async () => {
      const { getStyleSheet, getValue } = await render(`
        @use 'sass:meta';
        @use '../scss/modules/scale';

        $_: get-value(scale.type-scale(1));
        .test {
          @include scale.font-size(1);
        }
      `);

      const stylesheet = getStyleSheet();
      const rule = stylesheet.getRule('.test');
      const fontSize = stylesheet.getValue(rule, 'font-size');
      expect(fontSize).toBe(getValue(0));
    });
  });
});
