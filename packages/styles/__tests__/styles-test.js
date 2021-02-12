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

const { render } = SassRenderer.create(__dirname);

describe('@carbon/styles', () => {
  test('Public API', async () => {
    await render(`
      @use 'sass:meta';
      @use '../index.scss' as styles;

      // $_: get-value(meta.module-variables('colors'));
    `);

    // const variables = getValue(0);
    // expect(variables).toMatchSnapshot();
  });

  describe('scss/_colors.scss', () => {
    test('Public API', async () => {
      const { getValue } = await render(`
        @use 'sass:meta';
        // @use '../scss/colors';
        // $_: get-value(meta.module-variables('colors'));
      `);

      // const variables = getValue(0);
      // expect(variables).toMatchSnapshot();
    });
  });

  describe('scss/_motion.scss', () => {
    test('Public API', async () => {
      const { get } = await render(`
        @use 'sass:meta';
        @use '../scss/motion' as *;
        $_: get('exports', (
          functions: (
            motion: meta.function-exists('motion'),
          ),
          mixins: (
            motion: meta.mixin-exists('motion'),
          ),
          variables: (
            ease-in: meta.variable-exists('ease-in'),
            ease-out: meta.variable-exists('ease-out'),
            easing: meta.variable-exists('easing'),
            easings: meta.variable-exists('easings'),
            standard-easing: meta.variable-exists('standard-easing'),
            transition--base: meta.variable-exists('transition--base'),
            transition--expansion: meta.variable-exists('transition--expansion'),
            fast-01: meta.variable-exists('fast-01'),
            fast-02: meta.variable-exists('fast-02'),
            moderate-01: meta.variable-exists('moderate-01'),
            moderate-02: meta.variable-exists('moderate-02'),
            slow-01: meta.variable-exists('slow-01'),
            slow-02: meta.variable-exists('slow-02'),
          ),
        ));
      `);

      const { functions, mixins, variables } = get('exports');

      // Functions
      expect(functions.motion).toBe(true);

      // Mixins
      expect(mixins.motion).toBe(true);

      // Variables
      expect(variables['ease-in']).toBe(true);
      expect(variables['ease-out']).toBe(true);
      expect(variables.easing).toBe(true);
      expect(variables.easings).toBe(true);
      expect(variables['standard-easing']).toBe(true);
      expect(variables['transition--base']).toBe(true);
      expect(variables['transition--expansion']).toBe(true);
      expect(variables['fast-01']).toBe(true);
      expect(variables['fast-02']).toBe(true);
      expect(variables['moderate-01']).toBe(true);
      expect(variables['moderate-02']).toBe(true);
      expect(variables['slow-01']).toBe(true);
      expect(variables['slow-02']).toBe(true);
    });
  });
});
