/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Normalize a collection of icons by their basename
 * @param {Array<Icon>} icons
 * @return {Object}
 */
function normalize(icons) {
  // Collect all icons and group them by their base names. The value of the
  // basename key is the array of all sizes for that icon
  const iconsByBasename = icons.reduce((acc, icon) => {
    if (acc[icon.basename]) {
      return {
        ...acc,
        [icon.basename]: acc[icon.basename].concat(icon),
      };
    }
    return {
      ...acc,
      [icon.basename]: [icon],
    };
  }, {});

  // Go through all of the icons we have (by basename) and try and dedupe the
  // sizes. Dedupe in this case means that if we have downsampled an icon that
  // they should still use the same descriptor.
  //
  // In other words, if we have the 20, 24, and 32 variants all sharing the same
  // icon descriptor then we should only output one icon descriptor instead of
  // one for each.
  //
  // [icon, sizes]
  // [icon, []]     <-- Glyph
  // [icon, [16]]   <-- Sizes
  // [icon, [20, 24, 32]]
  return Object.keys(iconsByBasename).flatMap(basename => {
    return iconsByBasename[basename].reduce((acc, icon) => {
      // When an icon does not have a size, in other words it is a glyph, then
      // we concat an empty size array
      if (!icon.size) {
        return acc.concat([[icon, []]]);
      }

      const index = acc.findIndex(([descriptor, sizes]) => {
        if (icon.original) {
          return sizes.indexOf(icon.original) !== -1;
        }
        return sizes.indexOf(icon.size) !== -1;
      });

      if (index !== -1) {
        acc[index][1].push(icon.size);
        return acc;
      }

      return acc.concat([[icon, [icon.size]]]);
    }, []);
  });
}

module.exports = {
  normalize,
};
