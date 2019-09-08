/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

/**
 * @typedef {Decorator}
 * @property {string} name
 * @property {JoiSchema} schema
 * @property {Function} decorate
 * @property {Function} validate
 */

const categories = {
  name: 'categories',

  // Supports both top-level categories and subcategories
  //
  // categories:
  // - name: Category name
  //   members:
  //   - Member 1
  //   - Member 2
  //
  // categories:
  // - name: Category name
  //   subcategories:
  //   - name: Subcategory name
  //     members:
  //     - Member 1
  //     - Member 2
  schema: Joi.object().keys({
    categories: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          members: Joi.array().items(Joi.string()),
          subcategories: Joi.array().items(
            Joi.object().keys({
              name: Joi.string().required(),
              members: Joi.array()
                .items(Joi.string())
                .required(),
            })
          ),
        })
      )
      .required(),
  }),

  decorate(index, data) {
    const { categories } = data;
    for (const category of categories) {
      const { name, members, subcategories } = category;

      if (Array.isArray(subcategories)) {
        for (const subcategory of subcategories) {
          for (const member of subcategory.members) {
            const icon = index.find(({ name }) => name === member);
            icon.category = name;
            icon.subcategory = subcategory.name;
          }
        }
        return;
      }

      for (const member of members) {
        const icon = index.find(({ name }) => name === member);
        icon.category = name;
      }
    }
  },

  validate(index, data) {
    const { categories } = data;

    const icons = categories
      .map(({ subcategories, members }) => {
        if (Array.isArray(subcategories)) {
          return subcategories
            .map(subcategory => subcategory.members)
            .reduce((acc, members) => acc.concat(members), []);
        }
        return members;
      })
      .reduce((acc, members) => acc.concat(members), []);

    // Every entry in index should exist in data
    for (const icon of index) {
      if (!icons.includes(icon.name)) {
        throw new Error(
          `Expected icon \`${icon.name}\` from index to exist in category data`
        );
      }
    }

    // Every entry in data should exist in index
    for (const icon of icons) {
      if (!index.find(({ name }) => icon === name)) {
        throw new Error(
          `Expected icon \`${icon}\` from category data to exist in index`
        );
      }
    }
  },
};

const aliases = {
  name: 'aliases',

  // Supports top-level aliases with terms and members. The terms of an alias
  // will apply to each of its members.
  //
  // aliases:
  //   - terms:
  //     - Term A
  //     - Term B
  //     - Term C
  //     members:
  //     - Member 1
  //     - Member 2
  //     - Member 3
  schema: Joi.object().keys({
    aliases: Joi.array()
      .items(
        Joi.object().keys({
          terms: Joi.array()
            .items(Joi.string(), Joi.number())
            .required(),
          members: Joi.array()
            .items(Joi.string())
            .required(),
        })
      )
      .required(),
  }),

  decorate(index, data) {
    for (const alias of data.aliases) {
      const { terms, members } = alias;
      for (const member of members) {
        const entry = index.find(icon => {
          return icon.name === member;
        });

        entry.aliases = terms;
      }
    }
  },

  validate(index, data) {
    const icons = data.aliases
      .map(alias => alias.members)
      .reduce((acc, entry) => acc.concat(entry), []);

    // Every entry in index should exist in data
    for (const icon of index) {
      const entry = icons.find(name => {
        return name === icon.name;
      });

      if (!entry) {
        throw new Error(
          `Expected icon \`${icon.name}\` from index to exist in aliases data`
        );
      }
    }

    // Every entry in data should exist in index
    for (const name of icons) {
      const entry = index.find(icon => {
        return name === icon.name;
      });

      if (!entry) {
        throw new Error(
          `Expected icon \`${name}\` in aliases data to be defined in index`
        );
      }
    }
  },
};

const deprecated = {
  name: 'deprecated',
  schema: Joi.object().keys({
    deprecated: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          reason: Joi.string(),
          alternatives: Joi.array().items(Joi.string()),
        })
      )
      .required(),
  }),
  decorate() {},
  validate() {},
};

module.exports = {
  categories,
  aliases,
  deprecated,
};
