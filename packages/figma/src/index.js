import 'regenerator-runtime/runtime';

import { colors } from '@carbon/colors';

// We separate out certain colors that are not a part of the primary swatches
// that we need to render
const { black, white, orange, yellow, ...swatches } = colors;

import * as Commands from './commands';

async function run(identifier) {
  if (commands[identifier]) {
    const start = Date.now();
    console.log('Running command:', identifier);
    await commands[identifier];
    console.log(`Done in ${Date.now() - start}ms`);
  }
}

const commands = {
  'carbon.elements.colors.generate': Commands.GenerateColorsPage,
};

async function main() {
  const { command } = figma;

  if (!command) {
    throw new Error('Invalid command given to plugin');
  }

  if (!commands[command]) {
    throw new Error('Invalid command identifier given to plugin');
  }

  const start = Date.now();
  console.log('Running command:', identifier);
  await commands[identifier];
  console.log(`Done in ${Date.now() - start}ms`);

  figma.closePlugin();
  return;

  const Page = createPageModel(figma);
  const Rectangle = createRectangleModel(figma);

  const page = Page.select(Page.findOrCreate('color'));
  const style = figma.createPaintStyle();

  const ARTBOARD_WIDTH = 40;
  const ARTBOARD_HEIGHT = 40;
  const ARTBOARD_MARGIN = 8;
  let X_OFFSET = 0;
  let Y_OFFSET = 0;

  for (const swatch of Object.keys(swatches).sort(sortBySwatchName)) {
    for (const grade of Object.keys(swatches[swatch]).sort(sortBySwatchGrade)) {
      const hexcode = swatches[swatch][grade];
      const frame = figma.createFrame();
      const rectangle = figma.createRectangle();

      frame.name = `color / ${swatch} / ${swatch}-${grade}`;
      frame.relativeTransform = [[1, 0, X_OFFSET], [0, 1, Y_OFFSET]];
      frame.resize(ARTBOARD_WIDTH, ARTBOARD_HEIGHT);

      rectangle.resize(ARTBOARD_WIDTH, ARTBOARD_HEIGHT);
      rectangle.fills = [
        {
          type: 'SOLID',
          color: rgb(hexcode),
        },
      ];

      frame.appendChild(rectangle);

      X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
    }

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin();
}

function createRectangleModel(figma) {
  function create(properties = {}) {
    const rectangle = figma.createRectangle();
    const { width, height, ...rest } = properties;

    if (width || height) {
      rectangle.resize(width || rectangle.width, height || rectangle.height);
    }

    Object.keys(rest).forEach(key => {
      rectangle[key] = properties[key];
    });
    return rectangle;
  }

  return {
    create,
  };
}

function createPageModel(figma) {
  function find(name) {
    return figma.root.children.find(page => {
      return page.name === name;
    });
  }

  function findOrCreate(name, properties = {}) {
    // TODO check on name
    const page = figma.root.children.find(page => {
      return page.name === name;
    });
    if (page) {
      page.children.forEach(child => {
        child.remove();
      });
      return page;
    }
    return create(name, properties);
  }

  function create(name, properties = {}) {
    const page = figma.createPage();
    page.name = name;
    Object.keys(properties).forEach(key => {
      page[key] = properties[key];
    });
    return page;
  }

  function select(page) {
    figma.currentPage = page;
  }

  function remove(page) {
    page.remove();
  }

  return {
    create,
    findOrCreate,
    select,
    remove,
  };
}

function rgb(hexcode) {
  const channels = [
    hexcode.substring(1, 3),
    hexcode.substring(3, 5),
    hexcode.substring(5, 7),
  ].map(string => {
    if (string === '') {
      return 0;
    }

    const value = parseInt(string, 16);
    if (value === 0) {
      return value;
    }
    return value / 256;
  });

  return {
    r: channels[0],
    g: channels[1],
    b: channels[2],
  };
}

const order = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'cool-gray',
  'gray',
  'warm-gray',
];

function sortBySwatchName(a, b) {
  return order.indexOf(a) - order.indexOf(b);
}

function sortBySwatchGrade(a, b) {
  return parseInt(b, 10) - parseInt(a, 10);
}

main().catch(error => {
  console.error(error);
});
