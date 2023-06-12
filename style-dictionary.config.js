// @ts-nocheck
const {
  transforms,
  registerTransforms,
} = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform({
  name: 'extended/pxToRem',
  type: 'value',
  matcher: (match) => ['spacing', 'fontSizes'].includes(match.type),
  transformer: StyleDictionary.transform['size/pxToRem'].transformer,
});

const customTransforms = [...transforms, 'extended/pxToRem'];

module.exports = {
  source: ['src/figma/*.json'],
  platforms: {
    json: {
      buildPath: 'src/',
      transforms: customTransforms,
      files: [
        {
          format: 'json/nested',
          destination: 'tokens.json',
        },
      ],
    },
    css: {
      buildPath: 'src/',
      transforms: [...customTransforms, 'name/cti/kebab'],
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
