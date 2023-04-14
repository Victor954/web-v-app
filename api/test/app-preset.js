const tsPreset = require('ts-jest/jest-preset');
const shelfMongodbPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...tsPreset,
  ...shelfMongodbPreset,
}