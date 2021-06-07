/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const colors = [
  {
    name: 'Basic UI',
    tokens: [
      // Layer
      {
        name: 'layer-01',
        states: [
          {
            type: 'active',
            name: 'layer-active-01',
          },
          {
            type: 'hover',
            name: 'layer-hover-01',
          },
          {
            type: 'selected',
            name: 'layer-selected-01',
            states: [
              {
                type: 'hover',
                name: 'layer-selected-hover-01',
              },
            ],
          },
        ],
      },
      {
        name: 'layer-02',
        states: [
          {
            type: 'active',
            name: 'layer-active-02',
          },
          {
            type: 'hover',
            name: 'layer-hover-02',
          },
          {
            type: 'selected',
            name: 'layer-selected-02',
            states: [
              {
                type: 'hover',
                name: 'layer-selected-hover-02',
              },
            ],
          },
        ],
      },
      {
        name: 'layer-03',
        states: [
          {
            type: 'active',
            name: 'layer-active-03',
          },
          {
            type: 'hover',
            name: 'layer-hover-03',
          },
          {
            type: 'selected',
            name: 'layer-selected-03',
            states: [
              {
                type: 'hover',
                name: 'layer-selected-hover-03',
              },
            ],
          },
        ],
      },
      {
        name: 'layer-04',
        states: [
          {
            type: 'active',
            name: 'layer-active-04',
          },
          {
            type: 'hover',
            name: 'layer-hover-04',
          },
          {
            type: 'selected',
            name: 'layer-selected-04',
            states: [
              {
                type: 'hover',
                name: 'layer-selected-hover-04',
              },
            ],
          },
        ],
      },

      // Layer Accent
      {
        name: 'layer-accent-01',
        states: [
          {
            type: 'active',
            name: 'layer-accent-active-01',
          },
          {
            type: 'hover',
            name: 'layer-accent-hover-01',
          },
        ],
      },
      {
        name: 'layer-accent-02',
        states: [
          {
            type: 'active',
            name: 'layer-accent-active-02',
          },
          {
            type: 'hover',
            name: 'layer-accent-hover-02',
          },
        ],
      },
      {
        name: 'layer-accent-03',
        states: [
          {
            type: 'active',
            name: 'layer-accent-active-03',
          },
          {
            type: 'hover',
            name: 'layer-accent-hover-03',
          },
        ],
      },

      // Field
      {
        name: 'field-01',
        states: [
          {
            type: 'hover',
            name: 'field-hover-01',
          },
        ],
      },
      {
        name: 'field-02',
      },
      {
        name: 'field-03',
      },
      {
        type: 'disabled',
        name: 'field-disabled',
      },

      // Background
      {
        name: 'background-inverse',
      },
      {
        name: 'background-brand',
      },

      // Interactive
      {
        name: 'interactive',
      },
    ],
  },
  {
    name: 'Borders',
    tokens: [
      // Border subtle
      {
        name: 'border-subtle-00',
      },
      {
        name: 'border-subtle-01',
      },
      {
        name: 'border-subtle-02',
      },
      {
        name: 'border-subtle-03',
      },

      // Border strong
      {
        name: 'border-strong-01',
      },
      {
        name: 'border-strong-02',
      },
      {
        name: 'border-strong-03',
      },

      // Border inverse
      {
        name: 'border-inverse',
      },

      // Border interactive
      {
        name: 'border-interactive',
      },
    ],
  },
  {
    name: 'Text',
    tokens: [
      {
        name: 'text-primary',
      },
      {
        name: 'text-secondary',
      },
      {
        name: 'text-placeholder',
      },
      {
        name: 'text-helper',
      },
      {
        name: 'text-error',
      },
      {
        name: 'text-on-color',
      },
      {
        name: 'text-on-inverse',
      },
    ],
  },
  {
    name: 'Link',
    tokens: [
      {
        name: 'link-primary',
      },
      {
        name: 'link-secondary',
      },
      {
        name: 'link-on-color',
      },
      {
        name: 'link-inverse',
      },
    ],
  },
  {
    name: 'Icons',
    tokens: [
      {
        name: 'icon-primary',
      },
      {
        name: 'icon-secondary',
      },
      {
        name: 'icon-on-color',
      },
      {
        name: 'icon-inverse',
      },
    ],
  },
  {
    name: 'Support',
    tokens: [
      {
        name: 'support-error',
      },
      {
        name: 'support-success',
      },
      {
        name: 'support-warning',
      },
      {
        name: 'support-info',
      },
      {
        name: 'support-error-inverse',
      },
      {
        name: 'support-success-inverse',
      },
      {
        name: 'support-warning-inverse',
      },
      {
        name: 'support-info-inverse',
      },
      {
        name: 'support-caution-major',
      },
      {
        name: 'support-caution-minor',
      },
      {
        name: 'support-caution-undefined',
      },
    ],
  },
  {
    name: 'Miscellaneous',
    tokens: [
      {
        name: 'highlight',
      },
      {
        name: 'overlay',
      },
      {
        name: 'toggle-off',
      },
    ],
  },
  {
    name: 'States',
    groups: [
      {
        name: 'Active',
        tokens: [
          {
            name: 'background-active',
          },

          // Layer active
          {
            name: 'layer-active-02',
          },
          {
            name: 'layer-active-03',
          },

          // Layer accent active
          {
            name: 'layer-accent-active-02',
          },
          {
            name: 'layer-accent-active-03',
          },
        ],
      },
      {
        name: 'Focus',
        tokens: [
          {
            name: 'focus',
          },
          {
            name: 'focus-inset',
          },
          {
            name: 'focus-inverse',
          },
        ],
      },
      {
        name: 'Hover',
        tokens: [
          {
            name: 'background-hover',
          },
          {
            name: 'background-inverse-hover',
          },

          // Layer hover
          {
            name: 'layer-hover-02',
          },
          {
            name: 'layer-hover-03',
          },

          // Layer accent hover
          {
            name: 'layer-accent-hover-02',
          },
          {
            name: 'layer-accent-hover-03',
          },

          // Link
          {
            name: 'link-primary-hover',
          },
        ],
      },
      {
        name: 'Selected',
        tokens: [
          {
            name: 'background-selected',
          },
          {
            name: 'background-selected-hover',
          },

          // Layer selected
          {
            name: 'layer-selected-02',
          },
          {
            name: 'layer-selected-03',
          },

          // Layer selected hover
          {
            name: 'layer-selected-hover-02',
          },
          {
            name: 'layer-selected-hover-03',
          },

          {
            name: 'layer-selected-inverse',
          },

          // Border subtle
          {
            name: 'border-subtle-selected-01',
          },
          {
            name: 'border-subtle-selected-02',
          },
          {
            name: 'border-subtle-selected-03',
          },
        ],
      },
      {
        name: 'Disabled',
        tokens: [
          {
            name: 'layer-disabled',
          },
          {
            name: 'border-disabled',
          },
          {
            name: 'text-disabled',
          },
          {
            name: 'icon-disabled',
          },
          {
            name: 'text-on-color-disabled',
          },
          {
            name: 'icon-on-color-disabled',
          },
          {
            name: 'layer-selected-disabled',
          },
        ],
      },
    ],
  },
  {
    name: 'Skeleton',
    tokens: [
      {
        name: 'skeleton-background',
      },
      {
        name: 'skeleton-element',
      },
    ],
  },
];
