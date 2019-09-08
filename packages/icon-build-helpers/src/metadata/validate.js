/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

/**
 * Validate a given metadata structure and array of decorators with data. We use
 * a base schema for validating the given metadata, but rely on each decorator
 * to define a `validate` method that is called with the given metadata icon
 * index and the data associated with the decorator.
 *
 * @param {object} metadata
 * @param {Array} decoratorsWithData
 * @returns {void}
 */
function validate(metadata, decoratorsWithData = []) {
  const schema = Joi.object().keys({
    icons: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          friendly_name: Joi.string().required(),
          sizes: Joi.array().items(
            Joi.string().valid('glyph'),
            Joi.number().valid([16, 20, 24, 32])
          ),
        })
      )
      .required(),
  });
  const { error } = Joi.validate(metadata, schema);
  if (error) {
    throw new Error(error.annotate());
  }

  for (const { decorator, data } of decoratorsWithData) {
    const { error } = Joi.validate(data, decorator.schema);
    if (error) {
      throw new Error(error.annotate());
    }

    decorator.validate(metadata.icons, data);
  }
}

module.exports = {
  validate,
};
